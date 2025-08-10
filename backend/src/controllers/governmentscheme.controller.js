import { User } from "../models/User.model.js";
import { GovernmentScheme } from "../models/GovernmentScheme.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/Asynchandler.js";
import { body, validationResult } from "express-validator";
import Tesseract from "tesseract.js";







const scheme_List = asyncHandler(async(req, res)=>{
  try {
    let schemes
    if (req.user.role === 'central_admin') {
      schemes = await GovernmentScheme.find().populate( 'createdBy', 'name')
    }else{
      const user = await User.findById(req.user.id).populate('panchayat')
      if (!user.panchayat) {
      throw new ApiError(400, "user not belong to panchayat")
      }
      const {state, district} = user.panchayat
      schemes = await GovernmentScheme.find({
        $or: [
          { targetType: 'all'},
          { targetType: 'state', target: state},
          { targetType: 'district', target: district}
        ]
      }).populate('createdBy', 'name' )
    }


    return res.status(200).json(
      new ApiResponse(
        200,
        {schemes},
        "Schemes fetched"
      )
    )


  } catch (error) {
    throw new ApiError(500, error?.message || "server error in fetching list ")
  }
})



const scheme_detail = asyncHandler(async(req, res)=>{
  try {
    const scheme = await GovernmentScheme.findById(req.param.id)
    .populate('createdBy', 'name' )
    if (!scheme ) {
      throw new ApiError(404, "SCHEME NOT FOUND")
    }

    return res.status(201).json(
      new ApiResponse(
        201,
        {scheme},
        "Scheme detail found"
      )
    )
  } catch (error) {
    throw new ApiError(500, error?.message || "Scheme detail not found due to server error")
  }
})


const central_Scheme_List = asyncHandler(async(req, res)=>{
  try {
    const scheme = await GovernmentScheme.find().populate('createdBy', 'name')

    return res.status(203).json(
      new ApiResponse(
        203,
        {scheme},
        "Central scheme delivered"
      )
    )
    
  } catch (error) {
    throw new ApiError(500, error?.message || "server error in central admin scheme")
  }
})

const scheme_Create =[  body('title').notEmpty().withMessage('Title is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('targetType').isIn(['all', 'state', 'district']).withMessage('Target type must be all, state, or district'),
  body('target').optional().notEmpty().withMessage('Target is required for state or district'),
  body('startDate').isDate().withMessage('Valid start date is required'),
  body('endDate').isDate().withMessage('Valid end date is required'),
  
  asyncHandler(async(req, res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const{ title, description, targetType, target, startDate, endDate } = req.body
  
    const imagePath =req.file ? `/uploads/${req.file.filename}` : null;
  let extractedtext = '';
  
  
try {
  if (rq.file) {
    const  { data: { text }} = await Tesseract.recognize(
               path.join(__dirname, '..',req.file.path),
               'eng+hin+tam+tel',
            {logger: m => console.log(m)   }
               
            )
            extractedtext =  text.trim()
            content = content ? `${content}\n\nExtracted Text : ${extractedtext}` : extractedtext 
  }
  
  const scheme = new GovernmentScheme({
    title,
        description,
        targetType,
        target: targetType === 'all' ? null : target,
        startDate,
        endDate,
        imageUrl: imagePath,
        extractedtext,
        createdBy: req.user._id
  })
  await scheme.save()

  return  res.status(201).json(
    new ApiResponse(
      201,
      {scheme},
      "Scheme created"
    )
  )
} catch (error) {
  throw new ApiError(501, error?.message || "server error on creating scheme"

  )
}

})
]

const scheme_Update =[
  body('title').notEmpty().withMessage('Title is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('targetType').isIn(['all', 'state', 'district']).withMessage('Target type must be all, state, or district'),
  body('target').optional().notEmpty().withMessage('Target is required for state or district'),
  body('startDate').isDate().withMessage('Valid start date is required'),
  body('endDate').isDate().withMessage('Valid end date is required'),

 asyncHandler(async(req, res)=>{

  const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { title, description, targetType, target, startDate, endDate } = req.body;

    if (req.file) {
      updateData.imageUrl = `/uploads/${req.file.filename}`;
      // Optional: Perform OCR on new image if uploaded
      const { data: { text } } = await Tesseract.recognize(
        path.join(__dirname, '..', req.file.path),
        'eng+hin',
        { logger: m => console.log(m) }
      );
      updateData.extractedText = text.trim();
      updateData.description = description ? `${description}\n\nExtracted Text: ${updateData.extractedText}` : updateData.extractedText;
    }

try {
  const scheme = await GovernmentScheme.findByIdAndUpdate(req.params.id,{updateData}, {
        title,
        description,
        targetType,
        target: targetType === 'all' ? null : target,
        startDate,
        endDate
  },{ new: true})

   

  if (!scheme) {
    throw new ApiError(401, "Scheme not found")
  }

  return res.status(201).json(
    new ApiResponse(
      201,
      {scheme},
      "update done for scheme"
    )
  )
} catch (error) {
  throw new ApiError(500, error?.message || "server error on updating scheme")
}
})
]

const scheme_Delete = asyncHandler(async(req, res)=>{

  try {
    
    const scheme = await GovernmentScheme.findByIdAndDelete(req.param.id)
    if (!scheme) {
      throw new ApiError(400, "scheme not deleted")
    }

    return res.status(200).json(
      new ApiResponse(
        201,
        null,
        "Scheme deleted"
      )
    )
  } catch (error) {
    throw new ApiError(501, "server error on deleting scheme")
  }
})



export {
  scheme_detail,
  scheme_List,
  central_Scheme_List,
  scheme_Create,
  scheme_Update,
  scheme_Delete
}