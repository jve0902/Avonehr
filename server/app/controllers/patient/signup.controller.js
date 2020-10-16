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

/**
 * This function let client and user to signup into the system.
 * @param {object} req
 * @param {object} res
 * @returns {object} response
 */
exports.patientSignup = async (req, res) => {
  const db = makeDb(configuration, res);
  let patient = req.body.patient;
  patient.dob = moment(patient.dob).format("YYYY-MM-DD");
  patient.created = new Date();

  patient.password = bcrypt.hashSync(patient.password, 8);

  const existingPatientRows = await db.query(
    `SELECT 1 FROM patient WHERE client_id='${patient.client_id}' and  (email='${patient.email}' or ssn='${patient.ssn}') LIMIT 1`
  );

  if (existingPatientRows.length > 0) {
    errorMessage.error = [
      {
        value: JSON.stringify(patient),
        msg: "Patient is already in our system. Try with different values",
        param: "patient.body",
      },
    ];
    return res.status(status.error).send(errorMessage);
  }

  try {
    const patientResponse = await db.query(
      "INSERT INTO patient set ?",
      patient
    );

    if (!patientResponse.insertId) {
      errorMessage.message = "patient Cannot be registered";
      res.status(status.notfound).send(errorMessage);
    }

    if (patientResponse.insertId) {
      successMessage.message = "User succesfullly registered!";
      successMessage.data = patientResponse;
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
