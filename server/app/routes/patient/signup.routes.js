const express = require("express");
const controller = require("../../controllers/patient/signup.controller");
const fieldValidation = require("../../helpers/fieldValidation");

const router = express.Router();

// auth Routes

router.get("/auth/patient/client", controller.getClientByCode);
router.get("/auth/patient/client-form/:clientId", controller.getClientForm);

module.exports = router;
