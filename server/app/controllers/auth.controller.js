"use strict";

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Client = require("./../models/client.model");
const { configuration, makeDb } = require("../db/db.js");
const { errorMessage, successMessage, status } = require("../helpers/status");

exports.signup = async (req, res) => {
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

exports.signin = (req, res) => {
  successMessage.message = "From Auth v1 Signin";
  return res.status(status.created).send(successMessage);
};
