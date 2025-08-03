import mongoose,{Schema} from "mongoose";



const forumpostSchema = new Schema({
title: {
    type: String,
    required: [true, 'Title is required'],
  },
content: {
    type: String,
    required: [true, 'Content is required'],
  },
media: [{
    type: String,
    trim: true,
  }],
author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
category: {
    type: String,
     enum: ['health', 'agriculture', 'general', 'schemes']
  },
isAnonymous: {
    type: Boolean,
    default: false,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  comments: [
    { 
      type: mongoose.Schema.Types.ObjectId,
     ref: 'Comment' 
    }
    ] ,
},{timestamps: true})

forumpostSchema.index({ title: 'text', content: 'text'})

export const ForumPost = mongoose.model('ForumPost', forumpostSchema)