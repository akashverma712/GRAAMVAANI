
import jwt  from "jsonwebtoken";

import { asyncHandler } from "../utils/Asynchandler.js";

import { User } from "../models/User.model.js";
import { ApiError } from "../utils/ApiError.js";





const protect = asyncHandler((req, res, next) =>{
    let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      req.user =  User.findById(decoded.id).select('-password'); 
      if (!req.user) {
        throw new ApiError("User not found")
      }
      next();
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
})


const admin = (req, res, next) => {
  if (req.user && req.user?.role === 'admin') {
    next();
  } else {
    throw new ApiError({ message: 'Not authorized as admin' });
  }
};



const official = (req, res, next) => {
  if (req.user && (req.user?.role === 'admin' || req.user?.role === 'official')) {
    next();
  } else {
    throw new ApiError({ message: 'Not authorized' });
  }
};



export {
    protect,
    admin,
    official
}



// ai chatbot has to be integrated with gramvaani
// linkedin system for forum part
// sms and mail system for those who don't have smartphones
// new page for more personal information
// admin route for officials 
// neeraj admin dashboard ka frontend, and linkedin part
// admin portion ka backend
// admin route, sms integration and ai chatbot jo hai usko train 
 