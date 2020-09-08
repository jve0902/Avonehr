"use strict";

const express = require("express");
const { authJwt } = require("../../app/middlewares");
const Client = require("../controllers/accounting-search.controller.js");
const router = express.Router();

// clients Routes
router.get("/client/accounting", [authJwt.verifyToken], Client.getAll);
router.get("/client/accounting/search", [authJwt.verifyToken], Client.search);

module.exports = router;
