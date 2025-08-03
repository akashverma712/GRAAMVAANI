const express = require("express");
const router = express.Router();
const { addAdditionalInfo } = require("../controllers/userController");

router.post("/additional-info", addAdditionalInfo);

module.exports = router;
