import mongoose, {Schema} from "mongoose";


const forumcommentSchema = new Schema({

    content: {
    type: String,
    required:  [true, 'Content is required'],
    trim: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ForumPost',
    required: true,
  },
  parentComment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ForumComment',
  },
  likes: [
    {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }
],
  isAnonymous: {
    type: Boolean,
    default: false,
  },

},{timestamps: true})

forumcommentSchema.index({ content: 'text' });

export const ForumComment = mongoose.model('ForumComment', forumcommentSchema)