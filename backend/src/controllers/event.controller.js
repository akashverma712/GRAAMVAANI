
import { Event } from "../models/Event.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/Asynchandler.js";
import { sendSMS } from "../utils/SMS.js";


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

const getEventById = asyncHandler(async(req, res)=>{
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



const createEvent = asyncHandler(async(req, res)=>{

const { title, description, date, media, location, audioUrl } = req.body
    
    if (!title|| !date || !location) {
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


const updateEvent = asyncHandler(async(req, res)=>{

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


const deleteEvent = asyncHandler(async(req, res)=>{

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



export {
    getEvents,
    createEvent,
    getEventById,
    updateEvent,
    deleteEvent
}



