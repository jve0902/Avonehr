const express = require("express");
const controller = require("../controllers/auth.controller");
const fieldValidation = require("./../helpers/fieldValidation");

const router = express.Router();

// auth Routes

router.post(
  "/auth/signup",
  fieldValidation.validate("createUser"),
  controller.signup
);
router.post(
  "/auth/login",
  fieldValidation.validate("login"),
  controller.signin
);
router.post("/auth/field/validate", controller.fieldValiate);

module.exports = router;
