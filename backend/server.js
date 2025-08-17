const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Routes
const userRoutes = require("./routes/userRoutes");
const smsRoutes = require("./routes/smsRoutes");
const centralAdminRoutes = require("./routes/admin");      // central admin
const krishnaAdminRoutes = require("./routes/adminRoutes"); // local admin renamed to Krishna

// Load env vars
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/admin", centralAdminRoutes);      // central admin unchanged
app.use("/api/admin/krishna", krishnaAdminRoutes); // Krishna admin (local)
app.use("/api/sms", smsRoutes);

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
