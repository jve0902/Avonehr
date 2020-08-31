"use strict";

const express = require("express");
const { authJwt } = require("../../app/middlewares");
const Client = require("../controllers/clients.controller.js");
const router = express.Router();

// clients Routes
router.get("/client/agreement", [authJwt.verifyToken], Client.getAgreement);

module.exports = router;
