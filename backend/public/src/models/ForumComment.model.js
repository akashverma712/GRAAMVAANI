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
  isAnonymous: {
    type: Boolean,
    default: false,
  },

},{timestamps: true})



export const ForumComment = mongoose.model('ForumComment', forumcommentSchema)