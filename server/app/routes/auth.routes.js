const express = require("express");
const controller = require("../controllers/auth.controller");

const router = express.Router();

// auth Routes

router.post(
  "/auth/signup",
  controller.validate("createUser"),
  controller.signup
);
router.post("/auth/login", controller.validate("login"), controller.signin);
router.post("/auth/field/validate", controller.fieldValiate);

module.exports = router;
