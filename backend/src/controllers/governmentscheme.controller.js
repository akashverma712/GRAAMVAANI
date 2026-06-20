
import { GovernmentSchema } from "../models/GovernmentScheme.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/Asynchandler.js";







const getScheme = asyncHandler(async(req, res)=>{

   try {
     const schemes = await GovernmentSchema.findOne().lean()
     
     return res.status(200).json(
         new ApiResponse(
             200,
             {schemes},
             "Schemes displayed succesfully"
         )
     )
   } catch (error) {
     throw new ApiError(500, "Server Error on displaying Scheme")
   }
})

 const getSchemeById = asyncHandler(async(req, res)=>{
    const {schemeId} = req.params
try {
    
        const scheme = await GovernmentSchema.findById(schemeId).lean()
        if (!scheme) {
            throw new ApiError(402, "Scheme not found")
        }
    
        return res.status(201).json(
            new ApiResponse(
                201,
                {scheme},
                "Scheme retrieved Successfully"
            )
        )
} catch (error) {
    throw new ApiError(500, error?.message ||
         "server error in retrieving Scheme"
        )
}
 })


const createScheme = asyncHandler(async(req, res)=>{

    const { name, description, eligibility,
         applicationProcess, deadlines, category, audioUrl, media  }= req.body


    if (!name) {
        throw new ApiError(400, "Name is required")
    }

  if (audioUrl && !validator.isURL(audioUrl)) {
    throw new ApiError(400, 'Invalid audio URL');
  }
  if (media && !Array.isArray(media)) {
    throw new ApiError(400, 'Media must be an array of URLs');
  }
  if (media && media.some(url => !validator.isURL(url))) {
    throw new ApiError(400, 'Invalid media URL'); }

   try {
     const scheme = new GovernmentSchema({
         name,
         description,
         eligibility,
         applicationProcess,
         deadlines,
         category,
         audioUrl,
         media,
     })
 
     await scheme.save()
 
     return res.status(200).json(
         new ApiResponse(
             200,
             {scheme},
             'Scheme Created successfully'
 
         )
     )
   } catch (error) {
    throw new ApiError(500, 'Server error on creating Scheme')
   }
})

const updateScheme = asyncHandler(async(req, res)=>{
    const { schemeId } = req.params
    
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
      const scheme = await GovernmentSchema.findByIdAndUpdate(schemeId, req.body,
          { new: true , runValidators: true}
      )
      if (!scheme) {
          throw new ApiError(404, "Scheme not found")
      }
  
      return res.status(201).json(
          new ApiResponse(
              200,
              { scheme },
              "Scheme updated successfully"
          )
      )
  } catch (error) {
    throw new ApiError(500, error?.message || "Server error to Update scheme")
  }


})

const deleteScheme = asyncHandler(async(req, res)=>{

    const { schemeId } = req.params

  try {
      const scheme = await GovernmentSchema.findByIdAndDelete( schemeId )
  
      if (!scheme) {
          throw new ApiError(404, "Scheme not found")
      }

       if (scheme.createdBy?.toString() !== req.user.id && req.user.role !== 'admin') {
      throw new ApiError(403, 'Not authorized to delete this scheme');
    }

    await scheme.remove()
  
      return res.status(200).json(
          new ApiResponse(
              200,
              {},
              "Scheme deleted Successfully"
          )
      )
  } catch (error) {
    throw new ApiError(error?.message || "Error deleted Successfully")
  }
})



export {
    getScheme,
    createScheme,
    getSchemeById,
    updateScheme,
    deleteScheme
}


