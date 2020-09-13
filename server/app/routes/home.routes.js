"use strict";
const express = require("express");
const { authJwt } = require("../middlewares");
const Appointments = require("../controllers/home.controller.js");
const fieldValidation = require("../helpers/fieldValidation");
const router = express.Router();

router.get("/appointments", [authJwt.verifyToken], Appointments.getAll);
router.post(
  "/appointments",
  [authJwt.verifyToken],
  Appointments.createAppointment
);

module.exports = router;
