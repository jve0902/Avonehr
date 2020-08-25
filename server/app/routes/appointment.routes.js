const express = require("express");

const AppointmentTypes = require("../controllers/appointments.controller.js");

const router = express.Router();

// Appointment Types Routes
router.get("/appointment-types", AppointmentTypes.getAll);

module.exports = router;
