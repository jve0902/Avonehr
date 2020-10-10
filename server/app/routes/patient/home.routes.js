"use strict";
const express = require("express");
const { authJwt } = require("./../../middlewares");
const homeController = require("./../../controllers/patient/home.controller");
const router = express.Router();

router.get("/client-portal/header", [authJwt.verifyToken], homeController.getClientPortalHeader);


module.exports = router;
