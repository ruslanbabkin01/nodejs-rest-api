const express = require("express");
const router = express.Router();
const { auth: ctrl } = require("../../controllers");

router.post("/register", ctrl.register);

module.exports = router;
