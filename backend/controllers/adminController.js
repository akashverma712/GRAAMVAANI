const User = require("../models/userModel");

// Get users by district
const getUsersByDistrict = async (req, res) => {
  try {
    const { district } = req.params; // Example: /api/admin/users/Dhanbad
    const users = await User.find({ district });

    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found in this district" });
    }

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { getUsersByDistrict };
