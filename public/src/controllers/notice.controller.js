
import { Notice } from "../models/Notice.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/Asynchandler.js";

import { sendSMS } from "../utils/SMS.js";
import { User } from "../models/User.model.js";










const getNotice = asyncHandler(async(req, res)=>{

try {

    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const skip = (page - 1) * limit



    const notices = await Notice.find()
    .populate('createdBy','name')
    .skip(skip)
    .limit(limit)
    .lean()

    const total = await Notice.countDocuments()


    return res.status(200).json(
        new ApiResponse(
            200,
            { notices, page, limit , total },
            'Notice got succesfully '
        )
    )
} catch (error) {
     throw new ApiError(500,"Notice got succesfully")
}
})

const getNoticeById = asyncHandler(async(req, res)=>{

    const { noticeId } = req.params

    try {
        
        const notice = await Notice.findById( noticeId)
        .populate( 'createdBy', 'name').lean()

        if (!notice) {
            throw new ApiError( 404, 'Notice not found')
        }


        return res.status(200).json(
            new ApiResponse(
                200,
                {notice},
                "Get the Notice Successfully"
            )
        )


    } catch (error) {
        throw new ApiError(500, error?.message || "Failed to retrieve notice")
    }
})


const createNotice = asyncHandler(async(req, res)=>{

const { title, content, category, audioUrl, media } = req.body;

if (!title || !content || !category) {
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
        createdBy: req.user.id
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


const updateNotice = asyncHandler(async(req, res)=> {
    
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


const deleteNotice = asyncHandler(async(req, res)=>{

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




export{

    getNotice,
    createNotice,
    getNoticeById,
    updateNotice,
    deleteNotice
}




