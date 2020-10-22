"use strict";
const express = require("express");
const { authJwt } = require("../../app/middlewares");
const AccountingTypes = require("../controllers/accountoing-types.controller");
const router = express.Router();

router.get(
  "/accounting-types",
  [authJwt.verifyToken],
  AccountingTypes.getAccountingTypes
);

module.exports = router;
