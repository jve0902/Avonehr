"use strict";

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const moment = require("moment");
const { validationResult } = require("express-validator");
const config = require("./../../config");
const { configuration, makeDb } = require("../db/db.js");
const { errorMessage, successMessage, status } = require("../helpers/status");
const { generatePDF } = require("../helpers/user");

/**
 * This function validate the records value in database.
 * @param {object} req
 * @param {object} res
 * @returns {object} response
 */
exports.fieldValiate = async (req, res) => {
  if (!req.body.fieldName && !req.body.value) {
    errorMessage.message = "body content must be provided!";
    return res.status(status.error).send(errorMessage);
  }
  let tableName = "client"; // By default let if look into client table
  if (req.body.target) {
    tableName = req.body.target;
  }
  const db = makeDb(configuration, res);
  try {
    const rows = await db.query(
      `SELECT id, ${req.body.fieldName} FROM ${tableName} WHERE ${req.body.fieldName} = ?`,
      [req.body.value]
    );
    if (rows.length > 0) {
      errorMessage.message = {
        value: req.body.value,
        msg: `${req.body.value} already taken.`,
        param: `${tableName}.${req.body.fieldName}`,
      };
      return res.status(status.bad).send(errorMessage);
    }
    successMessage.message = {
      value: req.body.value,
      msg: `${req.body.value} can be used.`,
      param: `${tableName}.${req.body.fieldName}`,
    };
    res.status(status.success).send(successMessage);
  } catch (error) {
    return res.status(status.notfound).send(JSON.stringify(error));
  }
};

/**
 * This function let client and user to signup into the system.
 * @param {object} req
 * @param {object} res
 * @returns {object} response
 */
exports.signup = async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errorMessage.error = errors.array();
    return res.status(status.bad).send(errorMessage);
  }

  const db = makeDb(configuration, res);
  let client = req.body.client;
  client.created = new Date();
  client.calendar_start_time = "8:00";
  client.calendar_end_time = "18:00";
  client.functional_range = true;
  client.concierge_lab_ordering = false;

  let user = req.body.user;
  user.password = bcrypt.hashSync(user.password, 8);

  const existingClientRows = await db.query(
    `SELECT 1 FROM client WHERE name='${client.name}' OR phone='${client.phone}'  OR fax='${client.fax}'
    OR website='${client.website}' OR email='${client.email}' OR ein='${client.ein}' OR npi='${client.npi}' OR code='${client.code}' LIMIT 1`
  );

  if (existingClientRows.length > 0) {
    errorMessage.error = [
      {
        value: JSON.stringify(client),
        msg: "Client is already in our system. Try with different values",
        param: "client.body",
      },
    ];
    return res.status(status.error).send(errorMessage);
  }

  const existingUserRows = await db.query(
    `SELECT 1 FROM user WHERE email='${user.email}' OR npi='${user.npi}'  OR medical_license='${user.medical_license}' LIMIT 1`
  );

  if (existingUserRows.length > 0) {
    errorMessage.error = [
      {
        value: JSON.stringify(client),
        msg: "User is already in our system. Try different values",
        param: "user.body",
      },
    ];
    return res.status(status.error).send(errorMessage);
  }

  try {
    const clientResponse = await db.query("INSERT INTO client set ?", client);

    if (!clientResponse.insertId) {
      errorMessage.message = "Client Cannot be registered";
      res.status(status.notfound).send(errorMessage);
    }

    if (clientResponse.insertId) {
      user.client_id = clientResponse.insertId; //add user foreign key client_id from clientResponse
      user.admin = 1;
      user.sign_dt = new Date();
      const forwarded = req.headers["x-forwarded-for"];
      const userIP = forwarded
        ? forwarded.split(/, /)[0]
        : req.connection.remoteAddress;
      //TODO: for localhost ::1 might be taken. Need further test
      user.sign_ip_address = userIP;
      const userResponse = await db.query("INSERT INTO user set ?", user);
      const clientRows = await db.query(
        `SELECT id, name, email FROM client WHERE id = ${clientResponse.insertId}`
      );
      const userRows = await db.query(
        `SELECT id, client_id, firstname, lastname, email, sign_ip_address, sign_dt FROM user WHERE id = ${userResponse.insertId}`
      );
      successMessage.message = "User succesfullly registered!";
      const responseData = {
        user: userRows[0],
        client: clientRows[0],
      };
      // Create contract PDF
      const contractRows = await db.query(
        "SELECT id, contract, created FROM contract WHERE created=(select max(created) from contract)"
      );
      const contractContent = contractRows[0];
      const pdf = await generatePDF(contractContent.contract, userRows[0]);
      //end Create contract PDF

      successMessage.data = clientResponse.insertId;
      responseData.contractLink = pdf;
      successMessage.data = responseData;

      //run database procedure to set up basic data for the new Client
      //clientSetup(responseData.user.client_id, responseData.user.id);
      try {
        const clientSetupRows = await db.query("CALL clientSetup(?, ?)", [
          responseData.user.client_id,
          responseData.user.id,
        ]);
        console.log("clientSetupRows", clientSetupRows);
      } catch (error) {
        console.log("error", error);
      }

      res.status(status.created).send(successMessage);
    }
  } catch (err) {
    // handle the error
    errorMessage.error = err.message;
    res.status(status.error).send(errorMessage);
  } finally {
    await db.close();
  }
};

/**
 * This function let user to signin into the system.
 * @param {object} req
 * @param {object} res
 * @returns {object} response
 */
exports.signin = async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errorMessage.message = errors.array();
    return res.status(status.bad).send(errorMessage);
  }

  const db = makeDb(configuration, res);

  const rows = await db.query(
    "SELECT id, client_id, firstname, lastname, email, password, sign_dt, email_confirm_dt  FROM user WHERE email = ?",
    [req.body.email]
  );

  const user = rows[0];
  if (!user) {
    errorMessage.message = "User not found";
    errorMessage.user = user;
    return res.status(status.notfound).send(errorMessage);
  }
  const clientRows = await db.query(
    "SELECT id, name FROM client WHERE id = ?",
    [user.client_id]
  );

  if (!user.sign_dt) {
    errorMessage.message =
      "The password for this additional user can not be reset until user registration has first been completed.";
    delete user.password; // delete password from response
    user.client = clientRows[0];
    errorMessage.user = user;
    return res.status(status.unauthorized).send(errorMessage);
  }
  if (!user.email_confirm_dt) {
    errorMessage.message =
      "Login can not be done until the email address is confirmed.  Please see the request in your email inbox.";
    delete user.password; // delete password from response
    errorMessage.user = user;
    return res.status(status.unauthorized).send(errorMessage);
  }
  const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);

  if (!isPasswordValid) {
    errorMessage.message = "Wrong password!";
    errorMessage.user = user;
    return res.status(status.unauthorized).send(errorMessage);
  }

  //update user login_dt
  const now = moment().format("YYYY-MM-DD HH:mm:ss");
  const userUpdate = await db.query(
    `UPDATE user SET login_dt='${now}' WHERE id =${user.id}`
  );
  const token = jwt.sign({ id: user.id }, config.authSecret, {
    //expiresIn: 86400, // 24 hours
    expiresIn: 2 * 60, // 2minutes
  });
  user.accessToken = token;
  delete user.password; // delete password from response
  successMessage.data = user;
  res.status(status.success).send(successMessage);
};
