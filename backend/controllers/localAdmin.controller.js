import { User } from "../models/userModel.js";
import { Event } from "../models/Event.model.js";
import { Notice } from "../models/Notice.model.js";
import { asyncHandler } from "../utils/Asynchandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { sendSMS } from "../utils/SMS.js";
import { param, body, validationResult } from "express-validator";
import Tesseract from "tesseract.js";
import fs from 'fs';
import path from 'path';
import sharp from 'sharp'





const allUser = asyncHandler(async(req, res)=>{
    try {
        
        const users = await User.find({ 
            role: 'user' , 
            panchayat: req.user.panchayat
        })
        return res.status(200).json(
            new ApiResponse(
                200,
                {users},
                " User found "
            )
        )

    } catch (error) {
        throw new ApiError(501, error?.message || "Server error in getting Users")
    }
})


const performOCR = asyncHandler( async (source) =>{

    try {
        let tempPath = source
        if (!source.startsWith('http')) {
      tempPath = `${source}_processed.jpg`;
      await sharp(source).grayscale().sharpen().normalize().toFile(tempPath)  
        }

        const { data: { text } } = await Tesseract.recognize(
      tempPath,
      'eng+hin+tam+tel',
      { logger: (m) => console.log(m),
       
        tessdata: path.join(__dirname, '../tessdata')
         }
    );
    if (!source.startsWith('http')) fs.unlinkSync(tempPath)
    return text.trim();


    } catch (error) {
     
        console.error("OCR error:", error.message);
        return "";
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
    console.log("gjcjags");
    

 const errors = validationResult(req);
 if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
 }
 
 
 let { title, description, date, location, imageUrl, videoUrl, audioUrl } = req.body;
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

  

  let currentDescription = description || '';
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
   video: videoUrl,
   image: imageUrl ,
   audioUrl,
   extractedText,
   createdBy: req.user._id,
   panchayat: req.user.panchayat
 })
 
 await event.save()
 
 return res.status(201).json(
   new ApiResponse(
       201,
    { event },
     'Event created Successfully'
         )
     )
   } catch (error) {
      if (filePath) fs.unlinkSync(filePath);
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
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })

   const { eventId }= req.body 
 const { title, description, date, location,imageUrl, audioUrl, media, clerkId} = req.body;
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
        if (!event) {
               if (filePath) fs.unlinkSync(filePath);
            throw new ApiError(404, 'Event not found')
        }


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
               
     
         await event.save();
    
         return res.status(200).json(
            new ApiResponse(
                200,
                { event },
                'Event Updated successfully'
            )
         )
} catch (error) {
        if (filePath) fs.unlinkSync(filePath);
    throw new ApiError(500, error?.message || 'Event updated')
}

})
]



const deleteEvent =[
    param('id').isMongoId().withMessage('Invalid event ID'),

     asyncHandler(async(req, res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });


    try {

        const event = await Event.findById(req.params.id)
        if (!event) {
            throw new ApiError(404, 'Event not found');
        }
    
        await Event.findByIdAndDelete(req.params.id)
    
        return res.status(200).json(
            new ApiResponse(
                200,
                null,
                "Event deleted"
            )
        )
    } catch (error) {
        throw new ApiError(500, error?.message || "Failed to delete event")
    }
        
})
]


const getNotice = asyncHandler(async(req, res)=>{
    try {
        const notices = await Notice.find({
            $or: [{ panchayat: null}, {panchayat: req.user.panchayat}]
        }).populate('createdBy', 'name')

        return res.status(201).json(
            new ApiResponse(
                201,
                { notices },
                "all notices displayed"
            )
        )
        
    } catch (error) {
        throw new ApiError(501, error?.message || "server error on getting all notices")
    }
})

const createNotice =[
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

const { title, content, category, audioUrl, videoUrl, imageUrl  } = req.body;

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





if (!title ||  !category ) {
    if (filePath) fs.unlinkSync(filePath);
    
    throw new ApiError(400, 'All field required')
}




try {
  
    let currentContent = content || '';
    const ocrSource = imageUrl || filePath;
      if (ocrSource) {
        extractedText = await performOCR(ocrSource);
        currentContent = currentContent
          ? `${currentContent}\n\nExtracted Text: ${extractedText}`
          : extractedText;
      }


    const notice = new Notice({
        title, 
        content: currentContent,
        video: videoUrl,
        audioUrl,
        image: imageUrl,
        category,
        extractedText,
        createdBy: req.user._id,
        panchayat: req.user.panchayat
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
     if (filePath) fs.unlinkSync(filePath);

   throw new ApiError(500, "server error on creating notice")
}

})
]


const updateNotice =[
 param("id").isMongoId().withMessage("Invalid notice ID"),
  body("title").optional().notEmpty().withMessage("Title cannot be empty").trim().escape(),
  body("content").optional().trim().escape(),
  body("category")
    .optional()
    .isIn(["health", "agriculture", "general", "schemes", "forum"])
    .withMessage("Invalid category"),
  body("imageUrl").optional().isURL().withMessage("Invalid image URL"),
  body("videoUrl").optional().isURL().withMessage("Invalid video URL"),
  body("audioUrl").optional().isURL().withMessage("Invalid audio URL"),
asyncHandler(async(req, res)=> {


 const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    

    if (!req.user || !req.user._id) {
      throw new ApiError(401, "User not authenticated");
    }


const { title, content, category, audioUrl, media } = req.body;
 let extractedText = "";
    let filePath = null;
    let imagePath = null;

if (req.files?.image) {
      filePath = path.join(__dirname, "..", req.files.image[0].path);
      imagePath = `/public/${req.files.image[0].filename}`;
      imageUrl = imagePath;
    }
    if (req.files?.video) videoUrl = `/public/${req.files.video[0].filename}`;
    if (req.files?.audio) audioUrl = `/public/${req.files.audio[0].filename}`;





try {
    
        const notice = await Notice.findById(req.params.id)
        if (!notice) {
           if (filePath) fs.unlinkSync(filePath);
            throw new ApiError(404, 'Notice not found')
        }
    
      let currentContent = content || notice.content;
      const ocrSource = imageUrl || filePath;
      if (ocrSource) {
        extractedText = await performOCR(ocrSource);
        currentContent = currentContent
          ? `${currentContent}\n\nExtracted Text: ${extractedText}`
          : extractedText;
      } else {
        extractedText = notice.extractedText;
      }

      if (title) notice.title = title;
      if (currentContent) notice.content = currentContent;
      if (category) notice.category = category;
      if (imageUrl) notice.imageUrl = imageUrl;
      if (videoUrl) notice.videoUrl = videoUrl;
      if (audioUrl) notice.audioUrl = audioUrl;
      
      if (extractedText) notice.extractedText = extractedText;

      await notice.save();

      const populatedNotice = await Notice.findById(notice._id).populate("createdBy", "name").lean();

      const users = await User.find({ subscriptions: category || notice.category }).select("phone");
      const phoneNumbers = users.map((user) => user.phone).filter((phone) => phone);
      if (phoneNumbers.length > 0) {
        try {
          await sendSMS(phoneNumbers, `Updated ${category || notice.category} notice: ${title || notice.title}`);
        } catch (smsError) {
          console.error("SMS sending failed:", smsError.message);
        }
      }

   
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



const deleteNotice = [
  param("id").isMongoId().withMessage("Invalid notice ID"),
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    // Debug: Log req.user
    console.log("DeleteNotice - req.user:", req.user);

    if (!req.user || !req.user._id) {
      throw new ApiError(401, "User not authenticated");
    }

    try {
      const notice = await Notice.findById(req.params.id);
      if (!notice) {
        throw new ApiError(404, "Notice not found");
      }

      if (notice.createdBy.toString() !== req.user._id.toString() && req.user.role !== "admin") {
        throw new ApiError(403, "Not authorized to delete this notice");
      }

      await Notice.findByIdAndDelete(req.params.id);

      return res.status(200).json(
        new ApiResponse(
          200, 
          null,
           "Notice deleted successfully"
          ));
    } catch (error) {
      throw new ApiError(500, error?.message || "Error deleting notice");
    }
  }),
];

export {
    allUser,
    getNotice,
    createEvent,
    updateEvent,
    deleteEvent,
    createNotice,
    updateNotice,
    deleteNotice
}