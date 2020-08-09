const express = require("express");

const Client = require("../controllers/clients.controller.js");

const router = express.Router();

// clients Routes

router.get("/clients", Client.getAllClients);

module.exports = router;
