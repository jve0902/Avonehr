"use strict";
const { validationResult } = require("express-validator");
const moment = require("moment");
const { configuration, makeDb } = require("../db/db.js");
const { errorMessage, successMessage, status } = require("../helpers/status");
const {
  transporter,
  getPasswordResetURL,
  getEmailVerificationURL,
  resetPasswordTemplate,
  newAppointmentTemplate,
} = require("../helpers/email");

const getAll = async (req, res) => {
  const db = makeDb(configuration, res);
  try {
    const dbResponse = await db.query(
      `
      select uc.id, uc.user_id, uc.patient_id, uc.start_dt, uc.end_dt, uc.status, uc.client_id
      , p.firstname, p.email, concat(u.firstname, ' ', u.lastname) provider_name
      from user_calendar uc
      left join patient p on p.id=uc.patient_id
      left join user u on u.id=uc.user_id
      where uc.client_id=${req.client_id}
      and uc.user_id=${req.user_id}
      `
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

const createAppointment = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errorMessage.message = errors.array();
    return res.status(status.bad).send(errorMessage);
  }
  const { patient, start_dt, end_dt, providerName } = req.body.data;

  const db = makeDb(configuration, res);
  try {
    const insertResponse = await db.query(
      `insert into user_calendar (client_id, user_id, patient_id, start_dt, end_dt, created, created_user_id) values (${
        req.client_id
      }, ${req.user_id}, ${patient.id}, '${moment(start_dt).format(
        "YYYY-MM-DD HH:mm:ss"
      )}', '${moment(end_dt).format("YYYY-MM-DD HH:mm:ss")}', now(), ${
        req.user_id
      })`
    );
    if (!insertResponse.affectedRows) {
      errorMessage.error = "Insert not successful";
      return res.status(status.notfound).send(errorMessage);
    }
    const emailTemplate = newAppointmentTemplate(
      patient,
      moment(start_dt).format("YYYY-MM-DD HH:mm:ss"),
      providerName
    );
    if (process.env.NODE_ENV === "development") {
      let info = await transporter.sendMail(emailTemplate);
      console.info("Email for new appointment has bees sent!", info);
    } else {
      console.log("process.env.SENDGRID_API_KEY", process.env.SENDGRID_API_KEY);
      sgMail.send(emailTemplate).then(
        (info) => {
          console.log(`** Email for new appointment has bees sent! **`, info);
        },
        (error) => {
          console.error(error);
          if (error.response) {
            console.error("error.response.body:", error.response.body);
          }
        }
      );
    }
    successMessage.data = insertResponse;
    successMessage.message = "Insert successful";
    return res.status(status.created).send(successMessage);
  } catch (err) {
    console.log("err", err);
    errorMessage.error = "Insert not successful";
    return res.status(status.error).send(errorMessage);
  } finally {
    await db.close();
  }
};

const appointmentTypes = {
  getAll,
  createAppointment,
};

module.exports = appointmentTypes;
