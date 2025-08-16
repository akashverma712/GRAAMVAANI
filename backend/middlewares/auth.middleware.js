

import {User} from "../models/userModel.js"
import { ApiError } from "../utils/ApiError.js";

import { requireAuth } from '@clerk/express'
import { createClerkClient } from "@clerk/backend";



console.log("Environment Variables:", {
  CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY ? `sk_test_***${process.env.CLERK_SECRET_KEY.slice(-4)}` : "MISSING",
  CLERK_PUBLISHABLE_KEY: process.env.VITE_CLERK_PUBLISHABLE_KEY ? `pk_test_***${process.env.VITE_CLERK_PUBLISHABLE_KEY.slice(-4)}` : "MISSING",
});

if (!process.env.CLERK_SECRET_KEY) {
  throw new ApiError("CLERK_SECRET_KEY is missing in .env");
}


if (!process.env.VITE_CLERK_PUBLISHABLE_KEY) {
  throw new ApiError("CLERK_PUBLISHABLE_KEY is missing in .env");
}


const clerk = createClerkClient({ 
  secretKey: process.env.CLERK_SECRET_KEY ,
  publishableKey: process.env.VITE_CLERK_PUBLISHABLE_KEY
});





const clerkAuthMiddleware = requireAuth({
  clerk: clerk,
});

const Authentication = [
  (req, res, next) => {
    console.log("Request Headers:", req.headers);
    console.log("Authorization Header:", req.headers.authorization);
    next();
  },
  clerkAuthMiddleware,
  async (req, res, next) => {
    console.log("roy24678:");
    
     try {
      // Check if Clerk auth data is present
      if (!req.auth || !req.auth.userId) {
        throw new ApiError(401, "Unauthorized: No Clerk user ID found");
      }

      console.log("Clerk Auth Data:", req.auth);

      // Check if user exists in MongoDB
      let user = await User.findOne({ clerkId: req.auth.userId });
      if (!user) {
        console.log("Creating new user for Clerk ID:", req.auth.userId);
        // Fetch user from Clerk
        const clerkUser = await clerk.users.getUser(req.auth.userId);
        user = new User({
          clerkId: req.auth.userId,
          name: `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim() || "Unknown",
          email: clerkUser.emailAddresses?.[0]?.emailAddress || `user_${req.auth.userId}@example.com`,
          role: clerkUser.publicMetadata?.role || "user",
          panchayat: clerkUser.publicMetadata?.panchayat || null,
        });
        await user.save();
        console.log("New MongoDB User Created:", user);
      }

      req.user = user;
      console.log("MongoDB User Set:", user);
      next();
    } catch (error) {
      console.error("Clerk Auth Error:", error.message, error.stack);
      throw new ApiError(401, error.message || "Authorization failed");
    }
  },
];



const admin = (req, res, next) => {
  if (req.user && req.user?.role === 'admin') {
    next();
  } else {
    res.status(401).json({ message: 'Not authorized as admin' });
  }
};


const official = (req, res, next) => {
  console.log("ronit 5y:",req.user);
  
  if (req.user && (req.user?.role === 'admin' || req.user?.role === 'official')) {
    next();

  } else {
    res.status(403).json({ message: 'Not authorized' });
  }
};




      
    
  
   






export {
  
  Authentication,
    admin,
    official
}



