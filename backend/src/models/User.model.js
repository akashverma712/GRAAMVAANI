import mongoose, { Schema } from "mongoose";


const userShema = new Schema({

  clerkUserId: {
     type: String,
      unique: true,
       required: true
       },


  name: {
        type: String,
        required: [true, 'Name is required'],
    },
email: {
        type: String,
        lowercase: true,
        trim: true,
        unique: true,
    },
password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: 4,
    },
role: {
        type: String,
        enum: ['central_admin', 'local_admin', 'user'],
        default: 'user',
        required: true
    },
panchayat:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Panchayat',
    default: null
},
verified:{
  type: Boolean,
  default: false
},
identification:{
  type:{
    type: String,
    enum: ['Aadhaar','Voter ID']
  },
  number: String,
},
phone: {
      type: String,
      required: true,
      match: [/^[0-9]{10}$/, 'Invalid phone number']
    },
subscriptions: [{
    type: String,
    enum: ['health', 'agriculture', 'events', 'schemes'],
  }],
  profilePicture: {
     type: String,
     trim: true 
    },

}, { timestamps: true })



export const User = mongoose.model('User',userShema)