"use strict";
const nodemailer = require("nodemailer");

let mailConfig;
if (process.env.NODE_ENV === "production") {
  // all emails are delivered to destination
  mailConfig = {
    host: "smtp.sendgrid.net",
    port: 587,
    auth: {
      user: "real.user",
      pass: "verysecret",
    },
  };
} else {
  // all emails are catched by ethereal.email
  mailConfig = {
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: process.env.ETHEREAL_EMAIL,
      pass: process.env.ETHEREAL_PASS,
    },
  };
}

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport(mailConfig);

const signUpConfirmationTemplate = (user, url) => {
  const from = process.env.EMAIL_LOGIN;
  const to = user.email;
  const subject = "Signup Confirmation";
  const html = `
  <p>Hi ${user.displayName || user.email},</p>
  <p>Thank you for signing up</p>
  <p>To confirm your email address click or copy the following link:</p>
  <a href=${url}>${url}</a>

  <p>–-Clinios</p>
  `;

  return { from, to, subject, html };
};

const getEmailVerificationURL = (user, token) =>
  `${process.env.CLIENT_URL}/email/confirmation/${user.id}/${token}`;

const getPasswordResetURL = (user, token) =>
  `${process.env.CLIENT_URL}/password/reset/${user.id}/${token}`;

const resetPasswordTemplate = (user, url) => {
  const from = process.env.EMAIL_LOGIN;
  const to = user.email;
  const subject = "Clinios Password Reset";
  const html = `
  <p>Hey ${user.firstname || user.email},</p>
  <p>We heard that you lost your Clinios password. Sorry about that!</p>
  <p>But don’t worry! You can use the following link to reset your password:</p>
  <a href=${url}>${url}</a>
  <p>If you don’t use this link within 1 hour, it will expire.</p>
  <p>Do something outside today! </p>
  <p>–-Clinios</p>
  `;

  return { from, to, subject, html };
};

const email = {
  transporter, // for development only
  getEmailVerificationURL,
  getPasswordResetURL,
  resetPasswordTemplate,
  signUpConfirmationTemplate,
};

module.exports = email;
