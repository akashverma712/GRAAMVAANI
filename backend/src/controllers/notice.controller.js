
import { Notice } from "../models/Notice.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/Asynchandler.js";


import { param, query, validationResult } from "express-validator";









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

const getNoticeById =[
param('noticeId').isMongoId().withMessage('Invalid notice Id'),

asyncHandler(async(req, res)=>{

     const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

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
]







export{

    getNotice,
    getNoticeById,
   
}




