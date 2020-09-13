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
  <p>You can use the following link to reset your password.  It will expire in one hour.</p>
  <a href=${url}>${url}</a>
  `;

  return { from, to, subject, html };
};

/**
 * @param {object} patient
 * @param {date object} appointmentDate
 * @param {string} providerName
 * @returns {object} from, to, subject, html
 */
const newAppointmentTemplate = (patient, appointmentDate, providerName) => {
  const from = process.env.EMAIL_LOGIN;
  const to = patient.email;
  const subject = "New Appointment | Clinios";
  const html = `
    <p>Hi ${patient.firstname},</p>
    <p>A new appointment was created for you on ${appointmentDate} with ${providerName}.</p>
  `;
  return { from, to, subject, html };
};

const email = {
  transporter, // for development only
  getEmailVerificationURL,
  getPasswordResetURL,
  resetPasswordTemplate,
  signUpConfirmationTemplate,
  newAppointmentTemplate,
};

module.exports = email;
