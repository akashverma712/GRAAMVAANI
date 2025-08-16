
import mongoose,{Schema} from "mongoose";

const userSchema = new Schema({
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
    unique: true // keep this if every Clerk user is unique
  },

});

export const User = mongoose.model("User", userSchema);


