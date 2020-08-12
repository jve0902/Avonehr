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
        check("client.name", "Client name can not empty!")
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

exports.signup = async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errorMessage.error = errors.array();
    return res.status(status.error).send(errorMessage);
  }

  const db = makeDb(configuration);
  let client = req.body.client;
  let user = req.body.user;
  user.password = bcrypt.hashSync(user.password, 8);
  const new_client = new Client(client);

  //handles null error
  if (!new_client) {
    errorMessage.error = "Operation was not successful";
    res.status(status.error).send(errorMessage);
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
