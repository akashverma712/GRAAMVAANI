import { User } from "../models/User.model.js";
import { Event } from "../models/Event.model.js";
import { Notice } from "../models/Notice.model.js";
import { asyncHandler } from "../utils/Asynchandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { sendSMS } from "../utils/SMS.js";
import { param, body, validationResult } from "express-validator";







const allUser = asyncHandler(async(req, res)=>{
    try {
        
        const user = await User.find({ 
            role: 'user' , 
            panchayat: req.user.panchayat
        })
        return res.status(200).json(
            new ApiResponse(
                200,
                {user},
                " User found "
            )
        )

    } catch (error) {
        throw new ApiError(501, error?.message || "Server error in getting Users")
    }
})

const createEvent =[
    body('title').notEmpty().withMessage('Title is required').trim().escape(),
      body('date').isISO8601().withMessage('Date must be a valid date'),
      body('location').notEmpty().withMessage('Location is required').trim().escape(),
      body('description').optional().trim().escape(),
      body('audioUrl').optional().isURL().withMessage('Invalid audio URL'),
     body('panchayat').optional().isMongoId().withMessage('Valid panchayat ID is required'),
      
     asyncHandler(async(req, res)=>{

const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

const { title, description, date, media, location, audioUrl, panchayat } = req.body
    
    if (!title|| !date || !location || !panchayat ) {
        throw new ApiError(400, "all field Required")
    }

    if (audioUrl && !validator.isURL(audioUrl)) {
    throw new ApiError(400, 'Invalid audio URL');
  }

    if (media && !Array.isArray(media)) {
    throw new ApiError(400, 'Media must be an array of URLs');
  }
  if (media && media.some(url => !validator.isURL(url))) {
    throw new ApiError(400, 'Invalid media URL');
  }


   try {
     const event = new Event({
         title,
         description,
         date,
         location,
         media,
         audioUrl,
         createdBy: req.user.id,
         panchayat: req.user.panchayat
     })
 
     await event.save()
 
     return res.status(200).json(
         new ApiResponse(
             200,
             {event},
             'Event created Successfully'
         )
     )
   } catch (error) {
    console.log('New Event');
    throw new ApiError(500, error?.message || "Event not created due to server error")
    
   }
})
]


const updateEvent =[
     param('eventId').isMongoId().withMessage('Invalid event ID'),
      body('title').optional().notEmpty().withMessage('Title cannot be empty').trim().escape(),
      body('date').optional().isISO8601().withMessage('Date must be a valid date'),
      body('location').optional().notEmpty().withMessage('Location cannot be empty').trim().escape(),
      body('description').optional().trim().escape(),
      body('audioUrl').optional().isURL().withMessage('Invalid audio URL'),
    body('panchayat').optional().isMongoId().withMessage('Valid panchayat ID is required'),
      
    asyncHandler(async(req, res)=>{
        const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { eventId }= req.params

    if (audioUrl && !validator.isURL(audioUrl)) {
    throw new ApiError(400, 'Invalid audio URL');
  }

   if (media && !Array.isArray(media)) {
    throw new ApiError(400, 'Media must be an array of URLs');
  }
  if (media && media.some(url => !validator.isURL(url))) {
    throw new ApiError(400, 'Invalid media URL');
  }


try {
    
        const event = await Event.findByIdAndUpdate(eventId)
        if (!event) {
            throw new ApiError(404, 'Event not found')
        }
        if (event.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
            throw new ApiError(400, 'Not authorized to update this event')
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
    throw new ApiError(500, error?.message || 'Event updated')
}

})
]

const deleteEvent =[
     param('eventId').isMongoId().withMessage('Invalid event ID'),

     asyncHandler(async(req, res)=>{
         const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { eventId } = req.params

    try {
        const event = await Event.findByIdAndDelete(eventId)
        if (!event) {
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
        throw new ApiError(500, error?.message || "Failed to delete event")
    }
        
})
]


const getNotice = asyncHandler(async(req, res)=>{
    try {
        const notice = await Notice.find({
            $or: [{ panchayat: null}, {panchayat: req.user.panchayat}]
        })

        return res.status(201).json(
            new ApiResponse(
                201,
                {notice},
                "all notices displayed"
            )
        )
        
    } catch (error) {
        throw new ApiError(501, error?.message || "server error on getting all notices")
    }
})

const createNotice =[
     body('title').notEmpty().withMessage('Title is required').trim().escape(),
     body('content').notEmpty().withMessage('Content is required').trim().escape(),
     body('category').notEmpty().withMessage('Category is required').isIn(['health', 'agriculture', 'general', 'schemes', 'forum']).withMessage('Invalid category'),
     body('audioUrl').optional().isURL().withMessage('Invalid audio URL'),  
     body('panchayat').optional().isMongoId().withMessage('Valid panchayat ID is required'),
   
  asyncHandler(async(req, res)=>{

     const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

const { title, content, category, audioUrl, media, panchayat } = req.body;

if (!title || !content || !category || !panchayat) {
    throw new ApiError(400, 'All field required')
}

if (audioUrl && !validator.isURL(audioUrl)) {
    throw new ApiError(400, 'Invalid audio URL');
  }

if (media && !Array.isArray(media)) {
    throw new ApiError(400, 'Media must be an array of URLs');
  }
if (media && media.some(url => !validator.isURL(url))) {
    throw new ApiError(400, 'Invalid media URL');
  }



try {
    const notice = new Notice({
        title, 
        content,
        media: req.files ? req.files.map(file => file.path) : [],
        audioUrl,
        category,
        createdBy: req.user.id,
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
    if (req.files) req.files.forEach(file => require('fs').unlinkSync(file.path));
    
   throw new ApiError(500, "server error on creating notice")
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
    
const { noticeId } = req.params
   

if (audioUrl && !validator.isURL(audioUrl)) {
throw new ApiError(400, 'Invalid audio URL');
}


try {
    
        const notice = await Notice.findByIdAndUpdate(noticeId)
        if (!notice) {
            throw new ApiError(404, 'Notice not found')
        }
    
        if (notice.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
            throw new ApiError(401, "you are not authorized to update")
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
    
        const notice = Notice.findByIdAndDelete(noticeId)
    
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
    allUser,
    createEvent,
    updateEvent,
    deleteEvent,
    createNotice,
    updateNotice,
    deleteNotice
}