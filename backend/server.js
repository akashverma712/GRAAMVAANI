const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");


const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/admin");
const smsRoutes = require("./routes/smsRoutes"); // ✅ SMS route


dotenv.config();


connectDB();

const app = express();


app.use(cors());
app.use(express.json());


app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/sms", smsRoutes); // ✅ Bulk SMS endpoint

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
