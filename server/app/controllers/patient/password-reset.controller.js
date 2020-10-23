"use strict";
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const moment = require("moment");
const { configuration, makeDb } = require("../../db/db.js");
const { validationResult } = require("express-validator");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const {
  errorMessage,
  successMessage,
  status,
} = require("../../helpers/status");
const {
  transporter,
  getPasswordResetURL,
  resetPasswordTemplate,
} = require("../../helpers/email");

const { usePasswordHashToMakeToken } = require("../../helpers/password-helper");

/**
 * Send password reset email
 * Calling this function with a user's email sends an email URL to reset password
 * @param {object} req
 * @param {object} res
 * @returns {object} response
 */
exports.sendPasswordResetEmail = async (req, res) => {
  const db = makeDb(configuration, res);
  //Check where user already signed up or not
  const { email } = req.params;
  const patientRows = await db.query(
    "SELECT id, firstname, lastname, email, password, login_dt, created FROM patient WHERE email = ? LIMIT 1",
    [email]
  );
  if (patientRows.length < 1) {
    errorMessage.message =
      "We couldn't find any record with that email address.";
    return res.status(status.notfound).send(errorMessage);
  }

  const patient = patientRows[0];
  if (!patient) {
    errorMessage.message = "Patient not found";
    errorMessage.patient = patient;
    return res.status(status.notfound).send(errorMessage);
  }

  if (patient) {
    const token = usePasswordHashToMakeToken(patient);
    const token_expires = moment()
      .add(1, "hours")
      .format("YYYY-MM-DD HH:mm:ss"); // 1 hour

    // update user table for password reset token and expires time
    const patientUpdate = await db.query(
      `UPDATE patient SET reset_password_token='${token}', reset_password_expires='${token_expires}' WHERE id =${patient.id}`
    );
    if (patientUpdate.affectedRows) {
      sendRecoveryEmail(patient, res);
    }
  }
};

/**
 * Calling this function with a user will send email with URL
 * @param {object} user
 * @param {object} res
 * @returns {object} response
 */

const sendRecoveryEmail = async (user, res) => {
  const accesstToken = usePasswordHashToMakeToken(user);
  const url = getPasswordResetURL(user, accesstToken);
  const emailTemplate = resetPasswordTemplate(user, url);

  if (process.env.NODE_ENV === "development") {
    let info = await transporter.sendMail(emailTemplate);
    successMessage.message =
      "We have sent an email with instructions to reset your credentionals.";
    return res.status(status.success).send(successMessage);
  } else {
    console.log("process.env.SENDGRID_API_KEY", process.env.SENDGRID_API_KEY);
    sgMail.send(emailTemplate).then(
      (info) => {
        console.log(`** Email sent **`, info);
        return res.status(200).json({
          status: "success",
          message:
            "We have sent an email with instructions to reset your credentionals.",
        });
      },
      (error) => {
        console.error(error);
        if (error.response) {
          console.error("error.response.body:", error.response.body);
        }
        return res.status(500).json({
          status: "error",
          message: "Something went wrong while sending an reset email.",
        });
      }
    );
  }
};

/**
 * Calling this function with correct url will let user to reset password
 * @param {object} user
 * @param {object} res
 * @returns {object} response
 */
exports.receiveNewPassword = async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errorMessage.message = errors.array();
    return res.status(status.error).send(errorMessage);
  }

  const db = makeDb(configuration, res);
  const { userId, token } = req.params;
  const { password } = req.body;

  //find user with reset_password_token AND userId
  //check token expires validity
  const now = moment().format("YYYY-MM-DD HH:mm:ss");
  const userRows = await db.query(
    `SELECT id, email, reset_password_token, reset_password_expires FROM user WHERE id=${userId} AND reset_password_token='${token}' AND reset_password_expires > '${now}'`
  );
  let user = userRows[0];

  if (!user) {
    errorMessage.message = "User not found";
    errorMessage.user = user;
    return res.status(status.notfound).send(errorMessage);
  }

  //if all set then accept new password
  const hashedPassword = bcrypt.hashSync(password, 8);

  const updateUserResponse = await db.query(
    `UPDATE user SET password='${hashedPassword}', reset_password_token=NULL, reset_password_expires=NULL WHERE id =${user.id}`
  );

  if (updateUserResponse.affectedRows) {
    successMessage.message = "Password changed succesfullly!";
    return res.status(status.success).send(successMessage);
  }
};
