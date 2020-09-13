"use strict";
const express = require("express");
const { authJwt } = require("../middlewares");
const homeController = require("../controllers/home.controller.js");
const fieldValidation = require("../helpers/fieldValidation");
const router = express.Router();

router.get("/appointments", [authJwt.verifyToken], homeController.getAll);
router.post(
  "/appointments",
  [authJwt.verifyToken],
  homeController.createAppointment
);
router.put(
  "/appointments/cancel/:id",
  [authJwt.verifyToken],
  homeController.cancelAppointment
);
router.put(
  "/appointments/update/:id",
  [authJwt.verifyToken],
  homeController.updateAppointment
);

router.get("/providers", [authJwt.verifyToken], homeController.getProviders);

module.exports = router;
