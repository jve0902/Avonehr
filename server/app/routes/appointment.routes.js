const express = require("express");

const AppointmentTypes = require("../controllers/appointments.controller.js");
const fieldValidation = require("./../helpers/fieldValidation");

const router = express.Router();

// Appointment Types Routes
router.get("/appointment-types", AppointmentTypes.getAll);
router.post(
  "/appointment-types",
  fieldValidation.validate("createAppointmentType"),
  AppointmentTypes.create
);
router.put(
  "/appointment-types/:userId/:appointmentId",
  AppointmentTypes.update
);
router.delete("/appointment-types/:id", AppointmentTypes.deleteAppointment);

module.exports = router;
