const express = require("express");
const { authJwt } = require("../../app/middlewares");
const ClientPortalHeader = require("../controllers/patient-portal-header.controller");
const router = express.Router();

router.get(
  "/patient-portal-header",
  [authJwt.verifyToken],
  ClientPortalHeader.getClientPortalHeader
);

module.exports = router;
