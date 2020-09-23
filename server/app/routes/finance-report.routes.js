"use strict";
const express = require("express");
const { authJwt } = require("../middlewares");
const FinanceReport = require("../controllers/finance-report.controller.js");
const router = express.Router();

router.get(
  "/finance-report",
  [authJwt.verifyToken],
  FinanceReport.getAll
);
module.exports = router;
