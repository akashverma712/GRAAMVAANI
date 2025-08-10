const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  
  district: String,
  pincode: Number,
  state: String,
  panchayat: String,
  clerkId: {
    type: String,
    required: true,
    unique: true, // remove this line if you're getting duplicate/null issues
  },
 
});

const User = mongoose.model("User", userSchema);

module.exports = User;
