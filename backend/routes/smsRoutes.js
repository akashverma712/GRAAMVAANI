const express = require("express");
const { sendBulkSMS } = require("../controllers/smsController");

const router = express.Router();

// POST /api/sms/send
router.post("/send", sendBulkSMS);

module.exports = router;
