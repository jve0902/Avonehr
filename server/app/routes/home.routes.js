"use strict";
const express = require("express");
const { authJwt } = require("../middlewares");
const homeController = require("../controllers/home.controller.js");
const fieldValidation = require("../helpers/fieldValidation");
const router = express.Router();

router.get("/appointments", [authJwt.verifyToken], homeController.getAll);
router.get(
  "/appointments/:providerId",
  [authJwt.verifyToken],
  homeController.getEventsByProvider
);
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

router.get(
  "/appointments/request",
  [authJwt.verifyToken],
  homeController.getAppointmentRequest
);
router.get(
  "/unread-messages",
  [authJwt.verifyToken],
  homeController.getUnreadMessages
);
router.get("/providers", [authJwt.verifyToken], homeController.getProviders);
router.get(
  "/providers/:id",
  [authJwt.verifyToken],
  homeController.getProviderDetails
);

module.exports = router;
