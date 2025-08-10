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
  targetType:{
    type: String, 
    enum: ['all', 'state' , 'district'],
    required: true
  },
  target:{
    type: String
  },
applicationProcess: {
    type: String,
    trim: true
  },
  startDate:{
  type: Date
  },
  endDate: {
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
  extractedtext:{
    type: String
  },
  imageUrl:  {
    type: String
  }
},{timestamps: true})



export const GovernmentScheme = mongoose.model('GovernmentScheme', governmentSchema)