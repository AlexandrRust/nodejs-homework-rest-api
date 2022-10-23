const express = require("express");

const { ctrlWrapper } = require("../../helpers");
const ctrl = require("../../controllers/users");

const router = express.Router();

router.get("/verify/:verificationToken", ctrlWrapper(ctrl.verifyEmail));

module.exports = router;
