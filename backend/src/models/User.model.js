import mongoose, { Schema } from "mongoose";


const userShema = new Schema({
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
        enum: ['admin', 'official', 'villager'],
        default: 'villager',
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