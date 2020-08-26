const express = require("express");

const AppointmentTypes = require("../controllers/appointments.controller.js");

const router = express.Router();

// Appointment Types Routes
router.get("/appointment-types", AppointmentTypes.getAll);
//ADD some server side validation here
router.post("/appointment-types", AppointmentTypes.create);
router.put(
  "/appointment-types/:userId/:appointmentId",
  AppointmentTypes.update
);
router.delete("/appointment-types/:id", AppointmentTypes.deleteAppointment);

module.exports = router;
