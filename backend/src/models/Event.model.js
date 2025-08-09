import mongoose, {Schema} from "mongoose";



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
  media: [{
    type: String,
    trim: true,
  }],
  audioUrl: {
    type: String,
    trim: true,
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  panchayat:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Panchayat',
    default: null
  },
},{timestamps: true})



export const Event = mongoose.model('Event', eventSchema)