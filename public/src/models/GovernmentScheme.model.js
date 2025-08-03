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
    trim: true
  },
deadlines: {
    type: Date,
  },
category: {
    type: String,
    enum: ['health', 'agriculture', 'general', 'schemes']
  },
media: [{
    type: String,
    trim: true,
  }],
audioUrl: {
    type: String,
    trim: true,
  },
},{timestamps: true})



export const GovernmentSchema = mongoose.model('GovernmentSchema', governmentSchema)