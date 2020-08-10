const express = require("express");
const controller = require("../controllers/email.controller");
const router = express.Router();

// email Routes

router.post(
  "/api/auth/reset_password/user/:email",
  controller.sendPasswordResetEmail
);
router.post("/api/auth/reset/:userId/:token", controller.receiveNewPassword); // forget password reset

module.exports = router;
