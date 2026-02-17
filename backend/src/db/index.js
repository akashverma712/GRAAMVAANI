import mongoose from "mongoose";

import { DB_NAME } from "../constants.js";


const connectDB =async ()=>{
    try {
       const connecteddb = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`) 
       console.log(`MONGODB connected ** db host :${connecteddb.connection.host}`);
       
    } catch (error) {
        console.log('MONGODB connected Failed',error);
        process.exit(1)
        
    }
}

export default connectDB