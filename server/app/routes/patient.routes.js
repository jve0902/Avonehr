"use strict";

const express = require("express");
const { authJwt } = require("../../app/middlewares");
const Patient = require("../controllers/patient.controller.js");
const router = express.Router();

// clients Routes
router.get("/patient", [authJwt.verifyToken], Patient.getPatient);

module.exports = router;
