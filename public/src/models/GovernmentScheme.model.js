import mongoose, {Schema} from "mongoose";



const governmentSchema = new Schema({

name: {
    type: String,
    required: [true, 'Name is required'],
  },
description: {
    type: String,
    trim: true
  },
eligibility: {
    type: String,
    trim : true
  },
applicationProcess: {
    type: String,
  },
deadlines: {
    type: Date,
  },
category: {
    type: String,
    enum: ['health', 'agriculture', 'general', 'schemes']
  },
},{timestamps: true})



export const GovernmentSchema = mongoose.model('GovernmentSchema', governmentSchema)