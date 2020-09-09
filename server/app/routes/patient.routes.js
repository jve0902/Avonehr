"use strict";

const express = require("express");
const { authJwt } = require("../../app/middlewares");
const Patient = require("../controllers/patient.controller.js");
const validation = require("./../helpers/validations/patient.js");
const router = express.Router();

// clients Routes
router.get("/patient", [authJwt.verifyToken], Patient.getPatient);
router.get("/patient/search", [authJwt.verifyToken], Patient.search);
router.get("/patient/history", [authJwt.verifyToken], Patient.history);
router.get(
  "/patient/admin-note/history",
  [authJwt.verifyToken],
  Patient.AdminNotehistory
);
router.put(
  "/patient/admin-note/:id",
  [authJwt.verifyToken, validation.validate("adminNoteupdate")],
  Patient.adminNoteupdate
);

module.exports = router;
