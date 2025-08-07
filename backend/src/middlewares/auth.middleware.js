import { asyncHandler } from "../utils/Asynchandler.js";
import {Clerk} from "@clerk/clerk-sdk-node";
import { User } from "../models/User.model.js";
import { ApiError } from "../utils/ApiError.js";









const clerk = new Clerk({ secretKey: process.env.VITE_CLERK_PUBLISHABLE_KEY });

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {

      token = req.headers.authorization.split(' ')[1];

      const decoded = await clerk.verifyToken(token);

      const userId = decoded.sub;

      req.user = await User.findById(userId).select('-password ');

      if (!req.user) {
        throw new ApiError("User not found");
      }

      
      next();
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
});




const admin = (req, res, next) => {
  if (req.user && req.user?.role === 'admin') {
    next();
  } else {
    res.status(401).json({ message: 'Not authorized as admin' });
  }
};


const official = (req, res, next) => {
  if (req.user && (req.user?.role === 'admin' || req.user?.role === 'official')) {
    next();
  } else {
    res.status(403).json({ message: 'Not authorized' });
  }
};



export {
  protect,
    admin,
    official
}



