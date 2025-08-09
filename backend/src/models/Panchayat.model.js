import mongoose, {Schema} from "mongoose";


const panchayatSchema = new Schema({
lgd_code:{
     type: String,
     required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    
  },
  state: {
    type: String,
    required: true
  },
  district:{
   type: String,
   required: true
  },
},{timestamps: true})



export const Panchayat = mongoose.model('Panchayat', panchayatSchema)
