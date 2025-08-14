import mongoose, {Schema} from "mongoose";


const noticeSchema = new Schema({
title: {
    type: String,
    required: [true, 'Title is required'],
  },
content: {
    type: String,
    required: [true, 'Content is required'],
    trim: true,
  },

category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['health', 'agriculture', 'general', 'schemes']
  },

videoUrl:[ {
    type: String,
    trim: true,
  }],
  
  audioUrl:[ {
    type: String,
    trim: true,
  }],
  imageUrl:[{
    type: String
  }],
createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  panchayat: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Panchayat',
    default: null
  },
  extractedtext:{
    type: String
  },
  imageUrl:  {
    type: String
  }
},{timestamps: true})


export const Notice = mongoose.model('Notice', noticeSchema)