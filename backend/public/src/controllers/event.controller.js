
import { Event } from "../models/Event.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/Asynchandler.js";



const getEvents = asyncHandler(async(req, res)=>{

try {
    const events = await Event.find().populate('createdBy', 'name')
    
    return res.status(200).json(
        new ApiResponse(
            200,
            {events},
            'Event submitted'
        )
    )
} catch (error) {
    throw new ApiError(500,'Event not found')
}

})


const createEvent = asyncHandler(async(req, res)=>{

    const { title, description, date, location } = req.body 

   try {
     const event = new Event({
         title,
         description,
         date,
         location,
         createdBy: req.user.id
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



export {
    getEvents,
    createEvent
}



