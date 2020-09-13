"use strict";
const express = require("express");
const { authJwt } = require("../middlewares");
const patientEmailController = require("../controllers/patient-email.controller.js");
const router = express.Router();

router.get(
  "/history",
  [authJwt.verifyToken],
  patientEmailController.getHistory
);
router.delete(
  "/history/:date",
  [authJwt.verifyToken],
  patientEmailController.deleteHistory
);
module.exports = router;
