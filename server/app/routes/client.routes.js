"use strict";
const express = require("express");
const { authJwt } = require("../../app/middlewares");
const Client = require("../controllers/client.controller.js");
const router = express.Router();

router.get("/client/agreement", [authJwt.verifyToken], Client.getAgreement);

module.exports = router;
