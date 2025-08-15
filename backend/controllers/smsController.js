const axios = require("axios");
const User = require("../models/userModel");

const sendBulkSMS = async (req, res) => {
  try {
    let { title, description } = req.body;

    // Basic validation
    if (!title || !description) {
      return res.status(400).json({ message: "Title and description are required" });
    }

    title = title.trim();
    description = description.trim();

    // Fetch phone numbers from DB
    const users = await User.find({}, "phone");
    const phoneNumbers = users
      .map(user => user.phone && user.phone.trim())
      .filter(num => /^[0-9]{10}$/.test(num)); // only 10-digit valid numbers

    if (phoneNumbers.length === 0) {
      return res.status(400).json({ message: "No valid phone numbers found" });
    }

    console.log("📨 Sending SMS to:", phoneNumbers);

    // Prepare message
    const message = `${title}\n\n${description}`;

    // Send SMS via Fast2SMS
    const response = await axios.post(
      "https://www.fast2sms.com/dev/bulkV2",
      {
        route: "q", // quick transactional route
        message: message,
        language: "english",
        flash: 0,
        numbers: phoneNumbers.join(","),
      },
      {
        headers: {
          authorization: process.env.FAST2SMS_API_KEY,
          "Content-Type": "application/json"
        },
      }
    );

    if (response.data && response.data.return) {
      return res.status(200).json({
        success: true,
        message: "SMS sent successfully",
        data: response.data
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "Fast2SMS API error",
        data: response.data
      });
    }
  } catch (error) {
    console.error("❌ Error sending SMS:", error.response?.data || error.message);
    return res.status(500).json({
      message: "SMS sending failed",
      error: error.response?.data || error.message
    });
  }
};

module.exports = { sendBulkSMS };
