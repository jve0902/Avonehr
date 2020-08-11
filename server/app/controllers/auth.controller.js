"use strict";

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator/check");
const Client = require("./../models/client.model");
const { configuration, makeDb } = require("../db/db.js");
const { errorMessage, successMessage, status } = require("../helpers/status");

exports.validate = (method) => {
  switch (method) {
    case "createUser": {
      return [
        body("name", "name can not be empty").isEmpty(),
        body("email", "Invalid email").exists().isEmail(),
        body("phone").optional().isInt(),
        body("status").optional().isIn(["enabled", "disabled"]),
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
  let data = req.body;
  data.doctors_data_password = bcrypt.hashSync(
    req.body.doctors_data_password,
    8
  );
  const new_client = new Client(data);

  //handles null error
  if (!new_client) {
    errorMessage.error = "Operation was not successful";
    res.status(status.error).send(errorMessage);
  }

  try {
    const dbResponse = await db.query("INSERT INTO client set ?", new_client);

    if (!dbResponse.insertId) {
      errorMessage.error = "User Cannot be registered";
      res.status(status.notfound).send(errorMessage);
    }
    successMessage.message = "User succesfullly registered!";
    successMessage.data = dbResponse.insertId;
    res.status(status.created).send(successMessage);
  } catch (err) {
    // handle the error
    errorMessage.error = err.message;
    res.status(status.error).send(errorMessage);
  } finally {
    await db.close();
  }
};

exports.signin = async (req, res) => {
  const db = makeDb(configuration);
  const doctors_data_username = req.body.doctors_data_username;
  if (doctors_data_username) {
    const rows = await db.query(
      "SELECT * FROM client WHERE doctors_data_username = ?",
      [doctors_data_username]
    );
    const dbResult = rows[0];
    if (!dbResult) {
      errorMessage.error = "Client Cannot be found";
      return res.status(status.notfound).send(errorMessage);
    }

    const isPasswordValid = bcrypt.compareSync(
      req.body.doctors_data_password,
      dbResult.doctors_data_password
    );

    if (!isPasswordValid) {
      errorMessage.error = "Wrong password!";
      return res.status(status.unauthorized).send(errorMessage);
    }

    delete dbResult.doctors_data_password; // delete password from response
    successMessage.data = dbResult;
    res.status(status.success).send(successMessage);
  }

  errorMessage.error = "Body content can not be empty!";
  return res.status(status.notfound).send(errorMessage);
};
