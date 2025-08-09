
import { Event } from "../models/Event.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/Asynchandler.js";
import { param, validationResult } from "express-validator";


const getEvents = asyncHandler(async(req, res)=>{

try {
    const events = await Event.find().populate('createdBy', 'name')
    
    return res.status(200).json(
        new ApiResponse(
            200,
            {events},
            'Events recieved successfully'
        )
    )
} catch (error) {
    throw new ApiError(500,'Event not found')
}

})

const getEventById =[

     param('eventId').isMongoId().withMessage('Invalid event ID'),
   
     asyncHandler(async(req, res)=>{

         const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const {eventId} = req.params
try {
    
        const event = await Event.findById(eventId).populate('craetedBy','name')
        if (!event) {
            throw new ApiError(401,'Event not found')
        }
    
        return res.status(200).json(
            new ApiResponse(
                200,
                {event},
                "Event by id found"
            )
        )
} catch (error) {
    throw new ApiError(500, "Event by id not found server error")
}
})
]





export {
    getEvents,
    getEventById,
   
}



