
import { Notice } from "../models/Notice.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/Asynchandler.js";
import winston from "winston";
import { sendSMS } from "../utils/SMS.js";
import { User } from "../models/User.model.js";





const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
})




const getNotice = asyncHandler(async(req, res)=>{

try {
    const notices = await Notice.find().populate('createdBy','name').lean()
    
    return res.status(200).json(
        new ApiResponse(
            200,
            {notices},
            'Notice got succesfully '
        )
    )
} catch (error) {
    logger.error(`Get notices error: ${error.message}`);

    throw new ApiError(500,"Notice got succesfully")
}
})


const createNotice = asyncHandler(async(req, res)=>{
const { title, content, media, category } = req.body;

try {
    const notice = new Notice({
        title, 
        content,
        media,
        category,
        createdBy: req.user.id
    })
    
    await notice.save()
    logger.info(`Notice created: ${notice._id} by user ${req.user.id}`)
    
     const users = await User.find({ subscriptions: category }).select('phone');
    const phoneNumbers = users.map(user => user.phone).filter(phone => phone);
    
    if (phoneNumbers.length > 0) {
      await sendSMS(phoneNumbers, `New ${category} notice: ${title}`);
    }






    return res.status(200).json(
        new ApiResponse(
            200,
            {notice},
            "Notice created succesfully"
    
        )
    )
} catch (error) {
   logger.error(`Create notice error: ${error.message}`);
   throw new ApiError(500, "server error on creating notice")
}

})




export{
    getNotice,
    createNotice
}




