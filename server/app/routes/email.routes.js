const express = require("express");
const controller = require("../controllers/email.controller");
const router = express.Router();

// email Routes

router.get(
  "/email/confirmation/:userId/:token",
  controller.validate("verifyConfirmationEmail"),
  controller.verifyConfirmation
); // verify confirmation

router.post(
  "/email/send/verification",
  controller.validate("sendConfirmationEmail"),
  controller.sendSignupConfirmationEmail
); // Send Signup confirmation email
router.post(
  "/email/resend/verification",
  controller.validate("resendConfirmationEmail"),
  controller.resendSignupConfirmationEmail
); // Resend Signup confirmation email
router.post(
  "/auth/reset_password/user/:email",
  controller.sendPasswordResetEmail
);
router.post("/auth/reset/:userId/:token", controller.receiveNewPassword); // forget password reset

module.exports = router;
