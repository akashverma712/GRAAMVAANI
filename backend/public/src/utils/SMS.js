import  twilio  from "twilio";
import winston from "winston";
import { asyncHandler } from "./Asynchandler";



const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.File({
            filename: 'error.log',
            level: 'error'
        }),
        new winston.transports.File({
            filename: 'combined.log'
        })
    ]
})


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