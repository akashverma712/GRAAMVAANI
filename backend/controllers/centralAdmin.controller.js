
import {User} from '../models/userModel.js'
import { Event } from "../models/Event.model.js";
import { Notice } from "../models/Notice.model.js";
import { asyncHandler } from "../utils/Asynchandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { sendSMS } from "../utils/SMS.js";
import { param, body, validationResult } from "express-validator";
import Tesseract from 'tesseract.js';
import validator from 'validator'
import fs from "fs";
import path from "path";
import sharp from 'sharp';





const localAdmin = asyncHandler(async(req, res)=>{
    try {
        
        const localAdminUser = await User.findOne({ role: 'local_admin'}).populate('panchayat', 'name lgd_code')

        return res.status(200).json(
            new ApiResponse(
                200,
                { localAdminUser },
                "local admin fetched"
            )
        )
    } catch (error) {
    throw new ApiError(500,error?.message || "server error on getting localadmin")

    }
})


const verifyLocalAdmin = asyncHandler(async(req, res)=>{
    try {
        const user = await User.findById(req.params.id)

        if (!user || user.role !== 'local_admin') {
            throw new ApiError(404, 'Local admin not found')
        }
        user.verified = true;
        await user.save()

     return res.status(200).json(
        new ApiResponse(
            200,
            { user },
            "Local Admin Verified"
        )
     )
        
    } catch (error) {
        throw new ApiError(500, error?.message || "server error on not verifing")
    }
})


const createEvent =[
      body("title").notEmpty().withMessage("Title is required").trim().escape(),
  body("date").isDate().withMessage("Date must be a valid date"),
  body("location").notEmpty().withMessage("Location is required").trim().escape(),
  body("description").optional().trim().escape(),
  body("imageUrl").optional().isURL().withMessage("Invalid image URL"),
  body("videoUrl").optional().isURL().withMessage("Invalid video URL"),
  body("audioUrl").optional().isURL().withMessage("Invalid audio URL"),

    asyncHandler(async(req, res)=>{

        const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

const { title, description, date, imageUrl, videoUrl, location, audioUrl, panchayat } = req.body

     let extractedText = '';
     let filePath = null; 
     let imagePath = null;
     
     console.log("CreateEvent - req.files:", req.files);
     // Handle file upload
    
     if (req.files?.video) videoUrl = `/public/temp/${req.files.video[0].filename}`;
        if (req.files?.audio) audioUrl = `/public/${req.files.audio[0].filename}`;
    
     
        if (req.files?.image) {
          filePath = path.join(__dirname, "..", req.files.image[0].path);
          imagePath = `/public/temp/${req.files.image[0].filename}`;
          imageUrl = imagePath; // Override imageUrl with uploaded file
        }
    
    
    
     if (!title || !date || !location){
        if (filePath) fs.unlinkSync(filePath);
         throw new ApiError(400, "Title, date, and location are required")
     }


try {

    let currentDescription = description || "" ;
     const ocrSource = imageUrl || filePath; 
      if (ocrSource) {
        extractedText = await performOCR(ocrSource);
        currentDescription = currentDescription ?
         `${currentDescription}\n\nExtracted Text: ${extractedText}` : extractedText;
      }


   


     const event = new Event({
         title,
         description: currentDescription,
         date,
         location,
         media : media || [],
         audioUrl,
         imageUrl: imagePath,
         extractedText,
         createdBy: req.user._id,
         panchayat: panchayat || null
     })
 
     await event.save()
 
     return res.status(200).json(
         new ApiResponse(
             200,
             { event },
             'Event created Successfully'
         )
     )
   } catch (error) {
    if (filePath) await fs.unlinkSync(filePath).catch(() => {})
    throw new ApiError(500, error?.message || "Event not created due to server error")
    
   }
})
]

const updateEvent =[
   param('id').isMongoId().withMessage('Invalid event ID'),
  body('title').optional().notEmpty().withMessage('Title cannot be empty').trim().escape(),
  body('date').optional().isDate().withMessage('Date must be a valid date'),
  body('location').optional().notEmpty().withMessage('Location cannot be empty').trim().escape(),
  body('description').optional().trim().escape(),
  body('audioUrl').optional().isURL().withMessage('Invalid audio URL'),
   body("imageUrl").optional().isURL().withMessage("Invalid image URL"),
  body("videoUrl").optional().isURL().withMessage("Invalid video URL"),
 

 asyncHandler(async(req, res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

   const { eventId }= req.body
  const { title, date, location, description,imageUrl, audioUrl,videoUrl, panchayat, } = req.body
 let extractedText = '';
 let filePath = null; 
 let imagePath = null;
 
 // Handle file upload

 if (req.files?.video) videoUrl = `/public/temp/${req.files.video[0].filename}`;
    if (req.files?.audio) audioUrl = `/public/${req.files.audio[0].filename}`;

 
    if (req.files?.image) {
      filePath = path.join(__dirname, "..", req.files.image[0].path);
      imagePath = `/public/${req.files.image[0].filename}`;
      imageUrl = imagePath; // Override imageUrl with uploaded file
    }

    if (!clerkId) {
      throw new ApiError(400, "Clerk id not found")
    }
    


try {
    
        const event = await Event.findByIdAndUpdate(
            req.params.id,
            {eventId},
            {
                 $set : {
                title,
                date,
                location,
                description,
                audioUrl,
                media,
                imageUrl,
                panchayat
            }
        },
            {new: true ,  runValidators: true ,}
         )

          let currentDescription = description || event.description;
                  let extractedtext = event.extractedtext
                            
                         if (filePath) {
                               
                                 const { data: { text } } = await Tesseract.recognize(
                                     filePath,
                                     'eng+hin+tam+tel',
                                     { logger: m => console.log(m)
                                     }
                                 );
                                 extractedtext = text.trim();
                                 currentDescription = currentDescription ? `${currentDescription}\n\nExtracted Text: ${updateData.extractedtext}` : updateData.extractedtext;
                                updateData.imageUrl = imagePath
                                updateData.extractedtext = extractedtext
                                 updateData.description = currentDescription;
                             }
                        
      

       
       
            await event.save()
    
         return res.status(200).json(
            new ApiResponse(
                200,
                { event },
                'Event Updated successfully'
            )
         )
} catch (error) {
    if (filePath) await fs.unlink(filePath).catch(() => {});
    throw new ApiError(500, error?.message || 'Event updated')
}

})
]

const deleteEvent =[
    param('eventId').isMongoId().withMessage('Invalid event ID'),


 asyncHandler(async(req, res)=>{
    const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })

    const { eventId } = req.params

    try {

        const event = await Event.findByIdAndDelete(eventId)
        if (!event) {
                if (filePath) fs.unlinkSync(filePath);
            throw new ApiError(404, 'Event not found');
        }
    
        if (event.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
            throw new ApiError(404, 'Not Authorized to delete')
        }
    
        await event.remove()
    
        return res.status(200).json(
            new ApiResponse(
                200,
                null,
                "Event deleted"
            )
        )
    } catch (error) {
           if (filePath) fs.unlinkSync(filePath);
        throw new ApiError(500, error?.message || "Failed to delete event")
    }
        
})
]

const createNotice = [
    body("title").notEmpty().withMessage("Title is required").trim().escape(),
  body("content").optional().trim().escape(),
  body("category")
    .notEmpty()
    .withMessage("Category is required")
    .isIn(["health", "agriculture", "general", "schemes", "forum"])
    .withMessage("Invalid category"),
  body("imageUrl").optional().isURL().withMessage("Invalid image URL"),
  body("videoUrl").optional().isURL().withMessage("Invalid video URL"),
  body("audioUrl").optional().isURL().withMessage("Invalid audio URL"),

 asyncHandler(async(req, res)=>{

  const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

const { title, content, category, audioUrl, media, panchayat } = req.body;

let extractedText = "";
let filePath = null; // Always defined
let imagePath = null;


if (req.files?.image) {
      filePath = path.join(__dirname, "..", req.files.image[0].path);
      imagePath = `/public/temp/${req.files.image[0].filename}`;
      imageUrl = imagePath; // Override imageUrl with uploaded file
    }
 if (req.files?.video) videoUrl = `/public/temp/${req.files.video[0].filename}`;
 if (req.files?.audio) audioUrl = `/public/temp/${req.files.audio[0].filename}`;






try {
  
     let currentDescription = description || '';
      const ocrSource = imageUrl || filePath; 
      if (ocrSource) {
        extractedText = await performOCR(ocrSource);
        currentDescription = currentDescription ?
         `${currentDescription}\n\nExtracted Text: ${extractedText}` : extractedText;
      }
   


    const notice = new Notice({
        title, 
        content ,
        videoUrl,
        audioUrl,
        category,
        imageUrl: imagePath,
        extractedText,
        createdBy: req.user._id,
        panchayat: panchayat || null
    })
    
    await notice.save()

    const populatedNotice = await Notice.findById(notice._id).populate('createdBy',
        'name'
    ).lean()
    
    const users = await User.find({ subscriptions: category }).select('phone');
    const phoneNumbers = users.map(user => user.phone).filter(phone => phone);
    
    if (phoneNumbers.length > 0) {
     try {
           
        await sendSMS(phoneNumbers, `New ${category} notice: ${title}`);
     } catch (smsError) {
        console.error("SMS sending failed:", smsError.message);
    }
        
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            { notice: populatedNotice },
            "Notice created succesfully"
    
        )
    )
} catch (error) {
   if (filePath) await fs.unlink(filePath).catch(() => {});
    
   throw new ApiError(500, error?.message || "server error on creating notice")
}

})
]


const updateNotice =[
  param('noticeId').isMongoId().withMessage('Invalid notice ID'),
  body('title').optional().notEmpty().withMessage('Title cannot be empty').trim().escape(),
  body('content').optional().notEmpty().withMessage('Content cannot be empty').trim().escape(),
  body('category').optional().isIn(['health', 'agriculture', 'general', 'schemes', 'forum']).withMessage('Invalid category'),
  body('audioUrl').optional().isURL().withMessage('Invalid audio URL'),   
  body('panchayat').optional().isMongoId().withMessage('Valid panchayat ID is required'),

 asyncHandler(async(req, res)=> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    
const { noticeId } = req.body
const { title, content, category, audioUrl,imageUrl, media, panchayat } = req.body;
        let filePath = req.file ? path.join(__dirname, '..', req.file.path) : null;

if (audioUrl && !validator.isURL(audioUrl)) {
 if (filePath) await fs.unlink(filePath).catch(() => {});   
throw new ApiError(400, 'Invalid audio URL');
}
if (media && !Array.isArray(media)) {
            if (filePath) await fs.unlink(filePath).catch(() => {});
            throw new ApiError(400, 'Media must be an array of URLs');
        }
        if (media && media.some(url => !validator.isURL(url))) {
            if (filePath) await fs.unlink(filePath).catch(() => {});
            throw new ApiError(400, 'Invalid media URL');
        }




try {
    
        const notice = await Notice.findByIdAndUpdate(
            req.params.id,
            {noticeId},
            {$set:{
                title,
                content,
                category,
                audioUrl,
                media,
                imageUrl,
                panchayat
            }},
            {new: true, runValidators: true}


         )
        if (!notice) {
            throw new ApiError(404, 'Notice not found')
        }
    
        if (notice.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
            throw new ApiError(401, "you are not authorized to update")
        }

        let currentContent = updateData.content || notice.content;
            if (req.file) {
                updateData.imageUrl = `/public/${req.file.filename}`;
                const { data: { text } } = await Tesseract.recognize(
                    filePath,
                    'eng+hin+tam+tel'
                );
                updateData.extractedtext = text.trim();
                currentContent = currentContent ? `${currentContent}\n\nExtracted Text: ${updateData.extractedtext}` : updateData.extractedtext;
                updateData.content = currentContent;
            }

            await notice.save()

      const populatedNotice = await Notice.findById(notice._id)
      .populate( 'createdBy', 'name').lean()
    
      return res.status(200).json(
        new ApiResponse(
            200,
            {notice: populatedNotice},
            "Notice updated successfully"
        )
      )
} catch (error) {
    throw new ApiError(500, error?.message || "Error updated successfully")
}

})
]


const deleteNotice =[
    param('noticeId').isMongoId().withMessage('Invalid notice ID'),

asyncHandler(async(req, res)=>{

    const {noticeId} = req.params
try {
    
        const notice = await Notice.findByIdAndDelete(noticeId)
    
        if (!notice) {
            throw new ApiError(402, "Notice not found")
        }
    
        if (notice.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
                throw new ApiError(401, "you are not authorized to update")
            }
    
        await notice.remove()
    
        return res.status(200).json(
            new ApiResponse(
                200,
                {},
                "Notice deleted successfully"
            )
        )
} catch (error) {
    throw new ApiError(403, error?.message || "Server Error in deleting Notice")
}
})
]

export {
    localAdmin,
    verifyLocalAdmin,
    createEvent,
    updateEvent,
    deleteEvent,
    createNotice,
    updateNotice,
    deleteNotice
}