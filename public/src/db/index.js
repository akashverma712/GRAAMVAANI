import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";



const connectDB= async()=>{
    try {
       const connectioninstant= await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        
       console.log(`\n MONGODB CONNECTED SUCCESFULLY %% DB HOST:${connectioninstant.connection.host}`);
       

    } catch (error) {
        
        console.log("Mongodb connection error ", error);
        process.exit(1)
        
    }
}


export default connectDB