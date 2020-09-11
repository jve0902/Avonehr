"use strict";
const express = require("express");
const { authJwt } = require("../../app/middlewares");
const AppointmentTypes = require("../controllers/appointment-types.controller.js/index.js");
const router = express.Router();

router.get(
  "/appointment-types/users",
  [authJwt.verifyToken],
  AppointmentTypes.getAppointmentTypesUsers
);

module.exports = router;
