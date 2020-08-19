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
const moment = require("moment");
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
    case "resetPasswordNew": {
      return [
        param("token", "token can not be empty").exists(),
        param("userId", "UserId can not be empty").exists(),
        body("password").exists().withMessage("Password must be provided!"),
      ];
    }
  }
};

/**
 * `secret` is passwordHash concatenated with user's created,
 * so if someones gets a user token they still need a timestamp to intercept.
 * @param {object} user
 * @returns {string} token
 */
const usePasswordHashToMakeToken = (user) => {
  const passwordHash = user.password;
  const userId = user.id;
  const secret = passwordHash + "-" + user.created;
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
  try {
    //Check if user is already verified
    const userRows = await db.query(
      "SELECT id, token, email_confirm_dt FROM user WHERE id = ?",
      [req.params.userId]
    );

    let user = userRows[0];
    if (user) {
      //Check if user is already confirmed his/her email
      if (user.email_confirm_dt && !user.token) {
        successMessage.message = "User is already verified!";
        successMessage.data = user;
        return res.status(status.success).send(successMessage);
      }
      // update email_confirm_dt if it's null and remove token
      const now = moment().format("YYYY-MM-DD HH:mm:ss");
      const userUpdate = await db.query(
        `UPDATE user SET email_confirm_dt='${now}', token=null WHERE id = ?`,
        [req.params.userId]
      );
      user.email_confirm_dt = now;
      successMessage.data = user;
      successMessage.message = "Your Email address successfully verified!";
      return res.status(status.success).send(successMessage);
    } else {
      // Couldn't find the record
      errorMessage.message =
        "Couldn't find the record. Validation link might be broken. Check your email address";
      return res.status(status.notfound).send(errorMessage);
    }
  } catch (error) {
    // handle the error
    errorMessage.error = error;
    return res.status(status.error).send(errorMessage);
  } finally {
    await db.close();
  }
};

/**
 * Send signup confirmation email
 * @param {object} req
 * @param {object} res
 * @returns {object} response
 */
exports.sendSignupConfirmationEmail = async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errorMessage.message = errors.array();
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

  //update token field on that user table
  const userUpdate = await db.query(
    `UPDATE user SET token='${accesstToken}' WHERE id =${user.id}`
  );

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

  const db = makeDb(configuration);

  //Check where user already signed up or not
  const userRows = await db.query(
    "SELECT id, email, firstname, lastname, token, email_confirm_dt, created FROM user WHERE id = ?",
    [req.body.id]
  );
  if (userRows.length < 1) {
    errorMessage.error = "We couldn't find any record with that email address.";
    return res.status(status.notfound).send(errorMessage);
  }

  const user = userRows[0];
  let accesstToken;
  if (user.token) {
    accesstToken = user.token;
  } else {
    accesstToken = usePasswordHashToMakeToken(user);
    //update token field on that user table
    const userUpdate = await db.query(
      `UPDATE user SET token='${accesstToken}' WHERE id =${user.id}`
    );
  }
  const url = getEmailVerificationURL(user, accesstToken);
  const emailTemplate = signUpConfirmationTemplate(user, url);
  // send mail with defined transport object
  let info = await transporter.sendMail(emailTemplate);

  successMessage.message =
    "We have email verification link on your email address!";
  return res.status(status.success).send(successMessage);
};

/*** Calling this function with a registered user's email sends an email IRL ***/
/*** I think Nodemail has a free service specifically designed for mocking   ***/
exports.sendPasswordResetEmail = async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errorMessage.message = errors.array();
    return res.status(status.error).send(errorMessage);
  }

  const db = makeDb(configuration);
  //Check where user already signed up or not
  const { email } = req.params;
  const userRows = await db.query(
    "SELECT id, firstname, lastname, email, password, sign_dt, email_confirm_dt, created FROM user WHERE email = ? LIMIT 1",
    [email]
  );
  if (userRows.length < 1) {
    errorMessage.message =
      "We couldn't find any record with that email address.";
    return res.status(status.notfound).send(errorMessage);
  }

  const user = userRows[0];
  if (!user) {
    errorMessage.message = "User not found";
    errorMessage.user = user;
    return res.status(status.notfound).send(errorMessage);
  }
  const clientRows = await db.query(
    "SELECT id, name  FROM client WHERE id = ?",
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
  if (user) {
    const token = usePasswordHashToMakeToken(user);
    const token_expires = moment()
      .add(1, "hours")
      .format("YYYY-MM-DD HH:mm:ss"); // 1 hour

    // update user table for password reset token and expires time
    const userUpdate = await db.query(
      `UPDATE user SET reset_password_token='${token}', reset_password_expires='${token_expires}' WHERE id =${user.id}`
    );
    if (userUpdate.affectedRows) {
      sendRecoveryEmail(user, res);
    }
  }
};

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

exports.receiveNewPassword = async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errorMessage.message = errors.array();
    return res.status(status.error).send(errorMessage);
  }

  const db = makeDb(configuration);
  const { userId, token } = req.params;
  const { password } = req.body;

  //find user with reset_password_token  AND userId
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
