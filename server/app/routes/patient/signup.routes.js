const express = require("express");
const controller = require("../../controllers/patient/signup.controller");
const fieldValidation = require("../../helpers/fieldValidation");

const router = express.Router();

// auth Routes

router.get("/auth/patient/client", controller.getClientByCode);

module.exports = router;
