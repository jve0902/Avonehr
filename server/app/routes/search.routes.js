"use strict";
const express = require("express");
const { authJwt } = require("../middlewares");
const Search = require("../controllers/search.controller.js");
const router = express.Router();

router.post("/search", [authJwt.verifyToken], Search.getResult);

module.exports = router;
