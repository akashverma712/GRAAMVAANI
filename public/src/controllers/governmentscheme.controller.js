
import { GovernmentSchema } from "../models/GovernmentScheme.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/Asynchandler.js";







const getScheme = asyncHandler(async(req, res)=>{

   try {
     const schemes = await GovernmentSchema.findOne()
     
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


const createScheme = asyncHandler(async(req, res)=>{

    const { name, description, eligibility, applicationProcess, deadlines, category  }= req.body

   try {
     const scheme = new GovernmentSchema({
         name,
         description,
         eligibility,
         applicationProcess,
         deadlines,
         category
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



export {
    getScheme,
    createScheme
}


