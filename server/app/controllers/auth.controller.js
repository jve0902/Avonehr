"use strict";

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { body, check, validationResult } = require("express-validator/check");
const Client = require("./../models/client.model");
const User = require("./../models/user.model");
const { configuration, makeDb } = require("../db/db.js");
const { errorMessage, successMessage, status } = require("../helpers/status");

exports.validate = (method) => {
  switch (method) {
    case "login": {
      return [
        check("email", "Email can not empty!").exists().isEmail(),
        check("password", "Password can not empty!").exists().not().isEmpty(),
      ];
    }
    case "createUser": {
      return [
        check("client.name", "Practice name can not empty!")
          .exists()
          .not()
          .isEmpty(),
        check("client.address", "Practice address can not empty!")
          .exists()
          .not()
          .isEmpty(),
        check("client.city", "Practice city can not empty!")
          .exists()
          .not()
          .isEmpty(),
        check("client.state", "Practice state can not empty!")
          .exists()
          .not()
          .isEmpty(),
        check("client.postal", "Practice postal can not empty!")
          .exists()
          .not()
          .isEmpty(),
        check("client.phone", "Practice phone can not empty!")
          .exists()
          .not()
          .isEmpty(),
        check("client.fax", "Practice fax can not empty!")
          .exists()
          .not()
          .isEmpty(),
        check("client.email", "Practice email can not empty!")
          .exists()
          .not()
          .isEmpty(),
        check("client.website", "Practice website can not empty!")
          .exists()
          .not()
          .isEmpty(),
        check("client.ein", "Practice ein can not empty!")
          .exists()
          .not()
          .isEmpty(),
        check("client.npi", "Practice npi can not empty!")
          .exists()
          .not()
          .isEmpty(),
        check("client.code", "Client code can not empty!")
          .exists()
          .not()
          .isEmpty(),
        check("user.email", "User email can not empty!").exists().isEmail(),
        check("user.password", "User password can not empty!")
          .exists()
          .not()
          .isEmpty(),
      ];
    }
  }
};

exports.fieldValiate = async (req, res) => {
  if (!req.body.fieldName && !req.body.value) {
    errorMessage.message = "body content must be provided!";
    return res.status(status.error).send(errorMessage);
  }
  let tableName = "client"; // By default let if look into client table
  if (req.body.target) {
    tableName = req.body.target;
  }
  const db = makeDb(configuration);
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
      return res.status(status.inValid).send(errorMessage);
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

exports.signup = async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errorMessage.error = errors.array();
    return res.status(status.error).send(errorMessage);
  }

  const db = makeDb(configuration);
  let client = req.body.client;
  client.calendar_start_time = "8:00";
  client.calendar_end_time = "18:00";
  client.functional_range = true;
  client.concierge_lab_ordering = false;

  let user = req.body.user;
  user.password = bcrypt.hashSync(user.password, 8);
  const new_client = new Client(client);

  //handles null error
  if (!new_client) {
    errorMessage.error = "Operation was not successful";
    res.status(status.error).send(errorMessage);
  }

  const existingClientRows = await db.query(
    `SELECT 1 FROM client WHERE name='${client.name}' OR phone='${client.phone}'  OR fax='${client.fax}'
    OR website='${client.website}' OR email='${client.email}' OR ein='${client.ein}' OR npi='${client.npi}' OR code='${client.code}' LIMIT 1`
  );

  if (existingClientRows.length > 0) {
    errorMessage.error = [
      {
        value: JSON.stringify(client),
        msg: "Client is already in our system. Try different names",
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
        msg: "User is already in our system. Try different names",
        param: "user.body",
      },
    ];
    return res.status(status.error).send(errorMessage);
  }

  try {
    const clientResponse = await db.query(
      "INSERT INTO client set ?",
      new_client
    );

    if (!clientResponse.insertId) {
      errorMessage.error = "User Cannot be registered";
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
      user.sign_ip_address = userIP;
      const new_user = new User(user);
      const userResponse = await db.query("INSERT INTO user set ?", new_user);
      const clientRows = await db.query(
        `SELECT id, name, email FROM client WHERE id = ${clientResponse.insertId}`
      );
      const userRows = await db.query(
        `SELECT id, client_id, firstName, lastName, email FROM user WHERE id = ${userResponse.insertId}`
      );
      successMessage.message = "User succesfullly registered!";
      const responseData = {
        user: userRows[0],
        client: clientRows[0],
      };
      successMessage.data = clientResponse.insertId;
      successMessage.data = responseData;
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

exports.signin = async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errorMessage.error = errors.array();
    return res.status(status.error).send(errorMessage);
  }

  const db = makeDb(configuration);

  const rows = await db.query(
    "SELECT id, client_id, firstName, lastName, password, created  FROM user WHERE email = ?",
    [req.body.email]
  );
  const dbResult = rows[0];
  if (!dbResult) {
    errorMessage.message = "User Cannot be found";
    return res.status(status.notfound).send(errorMessage);
  }

  const isPasswordValid = bcrypt.compareSync(
    req.body.password,
    dbResult.password
  );

  if (!isPasswordValid) {
    errorMessage.message = "Wrong password!";
    return res.status(status.unauthorized).send(errorMessage);
  }

  const token = jwt.sign({ id: dbResult.id }, process.env.JWT_SECRET, {
    //expiresIn: 86400, // 24 hours
    expiresIn: 2 * 60, // 2minutes
  });
  dbResult.accessToken = token;
  delete dbResult.password; // delete password from response
  successMessage.data = dbResult;
  res.status(status.success).send(successMessage);
};
