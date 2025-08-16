import mongoose, {Schema} from "mongoose";
import { type } from "os";



const eventSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  description: {
    type: String,
  },
  date: {
    type: Date,
    required: [true, 'Date is required'],
  },
  imageUrl: {
    type: String,
    trim: true,
  },
  videoUrl:{
   type: String
   
  },
  audioUrl: {
    type: String,
    
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
},{timestamps: true})



export const Event = mongoose.model('Event', eventSchema)