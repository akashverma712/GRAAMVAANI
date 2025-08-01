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
media: [
    {
      type: String,
        trim: true,
    },
  ],
category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['health', 'agriculture', 'general', 'schemes']
  },
audioUrl: {
    type: String,
    trim: true,
  },  
createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
},{timestamps: true})


export const Notice = mongoose.model('Notice', noticeSchema)