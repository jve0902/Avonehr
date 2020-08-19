const express = require("express");
const controller = require("../controllers/email.controller");
const fieldValidation = require("./../helpers/fieldValidation");
const router = express.Router();

// email Routes

router.get(
  "/email/confirmation/:userId/:token",
  fieldValidation.validate("verifyConfirmationEmail"),
  controller.verifyConfirmation
); // verify confirmation

router.post(
  "/email/send/verification",
  fieldValidation.validate("sendConfirmationEmail"),
  controller.sendSignupConfirmationEmail
); // Send Signup confirmation email
router.post(
  "/email/resend/verification",
  fieldValidation.validate("resendConfirmationEmail"),
  controller.resendSignupConfirmationEmail
); // Resend Signup confirmation email
router.post(
  "/auth/reset_password/user/:email",
  fieldValidation.validate("resetPassword"),
  controller.sendPasswordResetEmail
);
router.post(
  "/auth/reset/:userId/:token",
  fieldValidation.validate("resetPasswordNew"),
  controller.receiveNewPassword
); // forget password reset

module.exports = router;
