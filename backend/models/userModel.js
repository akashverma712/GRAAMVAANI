// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   phone: String,
  
//   district: String,
//   pincode: Number,
//   state: String,
//   panchayat: String,
//   clerkId: {
//     type: String,
//     required: true,
//     unique: true, // remove this line if you're getting duplicate/null issues
//   },
 
// });

// const User = mongoose.model("User", userSchema);

// module.exports = User;
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    trim: true
  },
  district: {
    type: String,
    trim: true
  },
  pincode: {
    type: Number
  },
  state: {
    type: String,
    trim: true
  },
  panchayat: {
    type: String,
    trim: true
  },
  clerkId: {
    type: String,
    required: true,
    unique: true // 
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
