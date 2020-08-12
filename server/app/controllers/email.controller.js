/*** Documentation:

 * To make this token a one-time-use token, I encourage you to
 * use the patient’s current password hash in conjunction with
 * the patient’s created date (in ticks) as the secret key to
 * generate the JWT. This helps to ensure that if the patient’s
 * password was the target of a previous attack (on an unrelated website),
 * then the patient’s created date will make the secret key unique
 * from the potentially leaked password.

 * With the combination of the patient’s password hash and created date,
 * the JWT will become a one-time-use token, because once the patient
 * has changed their password, it will generate a new password hash
 * invalidating the secret key that references the old password
 * Reference: https://www.smashingmagazine.com/2017/11/safe-password-resets-with-json-web-tokens/
 **/
"use strict";
const nodemailer = require("nodemailer");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { configuration, makeDb } = require("../db/db.js");
const { body, param, validationResult } = require("express-validator");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const { errorMessage, successMessage, status } = require("./../helpers/status");
const {
  transporter,
  getPasswordResetURL,
  getEmailVerificationURL,
  resetPasswordTemplate,
  signUpConfirmationTemplate,
} = require("./../helpers/email");

exports.validate = (method) => {
  switch (method) {
    case "sendConfirmationEmail": {
      return [
        body("email")
          .exists()
          .withMessage("Email address must be provided!")
          .isEmail()
          .withMessage("Must be a valid email address"),
      ];
    }
    case "resendConfirmationEmail": {
      return [
        body("email")
          .exists()
          .withMessage("Email address must be provided!")
          .isEmail()
          .withMessage("Must be a valid email address"),
      ];
    }
    case "verifyConfirmationEmail": {
      return [
        param("token", "token can not be empty").exists(),
        param("userId", "UserId can not be empty").exists(),
      ];
    }
  }
};

/**
 * `secret` is passwordHash concatenated with user's createdAt,
 * so if someones gets a user token they still need a timestamp to intercept.
 * @param {object} user
 * @returns {string} token
 */
const usePasswordHashToMakeToken = (user) => {
  const passwordHash = user.password;
  const userId = user.id;
  const secret = passwordHash + "-" + user.createdAt;
  const token = jwt.sign({ userId }, secret, {
    expiresIn: 3600, // 1 hour
  });
  return token;
};

/**
 * Check confirmation token and validate user
 * @param {object} req
 * @param {object} res
 * @returns {object} response
 */
exports.verifyConfirmation = async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errorMessage.error = errors.array();
    return res.status(status.error).send(errorMessage);
  }

  const db = makeDb(configuration);
  //TODO: Check if user is already verified
  const userRows = await db.query(
    "SELECT id, client_id, firstName, lastName, email, password, isVerified, created FROM user WHERE id = ?",
    [req.params.userId]
  );
  if (userRows.length > 0 && userRows[0].isVerified) {
    successMessage.message = "User is already verified!";
    successMessage.isVerified = true;
    return res.status(status.success).send(successMessage);
  }
  //TODO: Check Token validity and check if user exist with the userId
  const rows = await db.query(
    `SELECT * from token where user_id=${req.params.userId}`
  );
  if (rows.length < 1) {
    errorMessage.message = "Couldn't find the record";
    return res.status(status.notfound).send(errorMessage);
  }

  if (req.params.userId == rows[0].user_id) {
    if (req.params.token !== rows[0].token) {
      errorMessage.message = "Access token broken. Check your email!";
      return res.status(status.error).send(errorMessage);
    }
    const userUpdate = await db.query(
      "UPDATE user SET isVerified=1 WHERE id = ?",
      [req.params.userId]
    );
    //TODO: Remove verification token from token table
    const tokenUpdate = await db.query(
      "UPDATE token SET token=null WHERE user_id = ?",
      [req.params.userId]
    );
    successMessage.message = "Your Email address successfully verified!";
    return res.status(status.success).send(successMessage);
  } else {
    errorMessage.error = "Invalid request!";
    return res.status(status.error).send(errorMessage);
  }
};

/**
 * Send signup confirmation email
 * @param {object} req
 * @param {object} res
 * @returns {object} response
 */
exports.sendSignupConfirmationEmail = async (req, res, next) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errorMessage.error = errors.array();
    return res.status(status.error).send(errorMessage);
  }
  const db = makeDb(configuration);
  const rows = await db.query(
    "SELECT id, client_id, firstName, lastName, email, password, created FROM user WHERE email = ?",
    [req.body.email]
  );

  if (rows.length < 1) {
    errorMessage.error = "We couldn't find any record with that email address.";
    return res.status(status.notfound).send(errorMessage);
  }

  const user = rows[0];
  const accesstToken = usePasswordHashToMakeToken(user);
  const url = getEmailVerificationURL(user, accesstToken);
  const emailTemplate = signUpConfirmationTemplate(user, url);

  const tokenData = {
    client_id: user.client_id,
    user_id: user.id,
    token: accesstToken,
  };
  const dbResponse = await db.query("INSERT INTO token set ?", tokenData);
  if (!dbResponse.insertId) {
    errorMessage.error = "Couldn't insert into token table";
    res.status(status.notfound).send(errorMessage);
  }

  // send mail with defined transport object
  let info = await transporter.sendMail(emailTemplate);

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  successMessage.message = ("Message sent: %s", info.messageId);
  return res.status(status.success).send(successMessage);
};

exports.resendSignupConfirmationEmail = async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errorMessage.message = errors.array();
    return res.status(status.error).send(errorMessage);
  }

  //TODO #1: Check into token table with provided user ID or email
  const db = makeDb(configuration);

  //Check where user already signed up or not
  const userRows = await db.query(
    "SELECT id, email, firstName, lastName, password, created FROM user WHERE id = ?",
    [req.body.id]
  );
  if (userRows.length < 1) {
    errorMessage.message = "We could find recored with this E-mail address!";
    return res.status(status.notfound).send(errorMessage);
  }
  const emailUser = userRows[0];

  const tokenRows = await db.query(
    "SELECT id, client_id, user_id, token, created_at FROM token WHERE user_id = ?",
    [req.body.id]
  );

  if (tokenRows.length < 1) {
    //TODO #2: if there is no record on token then create new token and send email notification
    const accesstToken = usePasswordHashToMakeToken(emailUser);
    const url = getEmailVerificationURL(emailUser, accesstToken);
    const emailTemplate = signUpConfirmationTemplate(emailUser, url);
    // send mail with defined transport object
    let info = await transporter.sendMail(emailTemplate);

    successMessage.message =
      "We have email verification link on your email address!";
    return res.status(status.success).send(successMessage);

    console.info("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    // Preview only available when sending through an Ethereal account
    console.info("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  }
  if (tokenRows.length > 0) {
    let user = tokenRows[0];
    //TODO #2: if token exists then resend email with that access token
    const accesstToken = user.token;
    const url = getEmailVerificationURL(emailUser, accesstToken);
    const emailTemplate = signUpConfirmationTemplate(emailUser, url);

    // send mail with defined transport object
    let info = await transporter.sendMail(emailTemplate);
    successMessage.message =
      "We have email verification link on your email address!";
    return res.status(status.success).send(successMessage);
    console.info("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    // Preview only available when sending through an Ethereal account
    console.info("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  }
};

/*** Calling this function with a registered patient's email sends an email IRL ***/
/*** I think Nodemail has a free service specifically designed for mocking   ***/
exports.sendPasswordResetEmail = async (req, res) => {
  if (!req.params.email) {
    return res.status(400).json({
      status: "error",
      message: "email must be provided!",
    });
  }
  const { email } = req.params;
  let patient;
  try {
    patient = await Patient.findOne({ email }).exec();
  } catch (err) {
    return res.status(404).json({
      status: "error",
      message: err,
    });
  }
  if (patient) {
    const token = usePasswordHashToMakeToken(patient);
    patient.resetPasswordToken = token;
    patient.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    patient.save(function (err) {
      sendRecoveryEmail(err, patient, res);
    });
  } else {
    return res.status(404).json({
      status: "error",
      message: "No patient with that email",
    });
  }
};

const sendRecoveryEmail = (err, patient, res) => {
  const accesstToken = usePasswordHashToMakeToken(patient);
  const url = getPasswordResetURL(patient, accesstToken);
  const emailTemplate = resetPasswordTemplate(patient, url);

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
};

exports.receiveNewPassword = async (req, res) => {
  const { patientId, token } = req.params;
  const { password } = req.body;
  if (!password) {
    return res.status(400).json({
      status: "error",
      message: "Body content can not be empty!",
    });
  }

  let patient;
  try {
    patient = await Patient.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    }).exec();
    if (!patient) {
      return res.status(400).json({
        status: "error",
        message: "Password reset token is invalid or has expired!",
      });
    }
    const secret = patient.password + "-" + patient.createdAt;
    const payload = jwt.decode(token, secret);

    if (payload.patientId == patient._id) {
      // patient._id is Object and payload.patientId is String so === won't work
      bcrypt.genSalt(10, function (err, salt) {
        if (err) return;
        bcrypt.hash(password, salt, function (err, hash) {
          if (err) return;
          Patient.findOneAndUpdate(
            { _id: patientId },
            {
              password: hash,
              resetPasswordToken: undefined,
              resetPasswordExpires: undefined,
            }
          )
            .then(() =>
              res.status(202).json({
                message: "Password changed accepted",
              })
            )
            .catch((err) => res.status(500).json(err));
        });
      });
    } else {
      return res.status(400).json({
        status: "error",
        message: "Wrong patient!",
      });
    }
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: "Invalid patient",
    });
  }
};
