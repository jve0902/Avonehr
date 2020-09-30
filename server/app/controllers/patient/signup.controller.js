"use strict";

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const moment = require("moment");
const { validationResult } = require("express-validator");
const config = require("./../../../config");
const { configuration, makeDb } = require("../../db/db.js");
const {
  errorMessage,
  successMessage,
  status,
} = require("../../helpers/status");

exports.getClientByCode = async (req, res) => {
  const db = makeDb(configuration, res);
  const { c } = req.query;
  try {
    const dbResponse = await db.query(
      `select id client_id from client where code='${c}'`
    );
    console.log("dbResponse", dbResponse);
    if (!dbResponse) {
      errorMessage.message = "None found";
      return res.status(status.notfound).send(errorMessage);
    }
    if (dbResponse.length === 0) {
      errorMessage.message = "Something went wrong with your login URL!";
      return res.status(status.bad).send(errorMessage);
    }
    successMessage.data = dbResponse;
    return res.status(status.created).send(successMessage);
  } catch (err) {
    console.log("err", err);
    errorMessage.error = "Select not successful";
    return res.status(status.error).send(errorMessage);
  } finally {
    await db.close();
  }
};

exports.getClientForm = async (req, res) => {
  const db = makeDb(configuration, res);
  const { clientId } = req.params;
  try {
    const dbResponse = await db.query(
      `select cf.id, cf.form from client_form cf where cf.client_id=${clientId} and type='S'`
    );
    if (!dbResponse) {
      errorMessage.error = "None found";
      return res.status(status.notfound).send(errorMessage);
    }

    successMessage.data = dbResponse;
    return res.status(status.created).send(successMessage);
  } catch (err) {
    console.log("err", err);
    errorMessage.error = "Select not successful";
    return res.status(status.error).send(errorMessage);
  } finally {
    await db.close();
  }
};
