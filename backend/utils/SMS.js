import  twilio  from "twilio";

import { asyncHandler } from "../utils/Asynchandler.js";






const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH)




const sendSMS = asyncHandler(async(phoneNumbers,message) =>{

    for( const phone of phoneNumbers){
        await client.messages.create({
            body: message,
            from: process.env.TWILIO_PHONE,
            to: phone,
        });
        logger.info(`SMS sending failed: ${error.message}`)
    }
})




export{
    sendSMS
}