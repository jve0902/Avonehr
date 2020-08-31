"use strict";

const express = require("express");
const { authJwt } = require("../middlewares");

const Appointments = require("../controllers/appointments.controller.js");
const fieldValidation = require("../helpers/fieldValidation");

const router = express.Router();

// Appointment Types Routes
router.get("/appointments", [authJwt.verifyToken], Appointments.getAll);

module.exports = router;
