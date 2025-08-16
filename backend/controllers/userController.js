import {User} from "../models/userModel.js";

const addAdditionalInfo = async (req, res) => {
  try {
    const { name, email, phone, district, pincode, state, panchayat, clerkId } = req.body;

    if (!clerkId) {
      return res.status(400).json({ error: "Clerk ID is required" });
    }


    const updatedUser = await User.findOneAndUpdate(
      { clerkId },
      { name, email, phone, district, pincode, state, panchayat },
      { upsert: true, new: true, runValidators: true }
    );

    res.status(200).json({ message: "User info saved", user: updatedUser });
  } catch (error) {
    console.error("Error in addAdditionalInfo:", error.message);
    res.status(500).json({ error: "Server error" });
  }
};

export {
  addAdditionalInfo
}
