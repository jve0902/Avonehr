"use strict";

const express = require("express");
const { authJwt } = require("../../app/middlewares");

const AppointmentTypes = require("../controllers/appointments-types.controller.js");
const fieldValidation = require("./../helpers/fieldValidation");

const router = express.Router();

// Appointment Types Routes
router.get(
  "/appointment-types",
  [authJwt.verifyToken],
  AppointmentTypes.getAll
);
router.post(
  "/appointment-types",
  [fieldValidation.validate("createAppointmentType"), authJwt.verifyToken],
  AppointmentTypes.create
);
router.put(
  "/appointment-types/:userId/:appointmentId",
  [authJwt.verifyToken],
  AppointmentTypes.update
);
router.delete(
  "/appointment-types/:id",
  [authJwt.verifyToken],
  AppointmentTypes.deleteAppointment
);

// Appointment Types Users
router.get(
  "/appointment-types/users",
  [authJwt.verifyToken],
  AppointmentTypes.getAppointmentTypesUsers
);

module.exports = router;
