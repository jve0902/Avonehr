const express = require("express");
const controller = require("../controllers/auth.controller");

const router = express.Router();

// auth Routes

router.post("/auth/signup", controller.signup);
router.post("/auth/login", controller.signin);

module.exports = router;
