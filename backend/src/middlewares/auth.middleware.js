import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/User.model.js";
import dotenv from "dotenv";



// Debug: Log Clerk secret key (partially obscured for security)
//console.log("Clerk Secret Key Loaded:", process.env.CLERK_SECRET_KEY ? `sk_test_***${process.env.CLERK_SECRET_KEY.slice(-4)}` : "MISSING");

const clerkAuth = ClerkExpressRequireAuth({
  secretKey: process.env.CLERK_SECRET_KEY,
});

const requireAuth = [

  clerkAuth,
  async (req, res, next) => {
    try {
      // Debug: Log Clerk auth data
      console.log("Clerk Auth Data:", req.auth);
      if (!req.auth || !req.auth.userId) {
        throw new ApiError(401, "Unauthorized: No Clerk user ID found");
      }

      // Find or create user in MongoDB
      let user = await User.findOne({ clerkUserId: req.auth.userId });
      if (!user) {
        console.log("Creating new user for Clerk ID:", req.auth.userId);
        user = new User({
          clerkUserId: req.auth.userId,
          name: req.auth.user?.firstName || "Unknown",
          email: req.auth.user?.emailAddresses?.[0]?.emailAddress || `user_${req.auth.userId}@example.com`,
          role: "user",
          panchayat: null, // Default; update via Clerk metadata if needed
        });
        await user.save();
      }

      // Debug: Log MongoDB user
      console.log("MongoDB User:", user);

      req.user = user; // Set req.user to MongoDB User document
      next();
    } catch (error) {
      console.error("Clerk Auth Error:", error.message, error.stack);
      next(new ApiError(401, error.message || "Authentication middleware error"));
    }
  },
];

export default requireAuth;