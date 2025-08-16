import express from "express"
import cors from "cors"
import dotenv from "dotenv";
import connectDB from './config/db.js' 






// Routes
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/admin.js"; // Admin route
import eventRoutes from './routes/event.routes.js';
import forumRoutes from './routes/forum.routes.js';
import noticeRoutes from './routes/notice.routes.js'
import schemeRoutes from './routes/schemes.routes.js'
import localAdminsRoutes from './routes/localadmin.routes.js'
import centralAdminRoutes from './routes/centraladmin.routes.js'


dotenv.config({
  path: "./.env"
});
connectDB();

const app = express();




app.use(cors());
app.use(express.json());




// Routes
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use('/api/events',eventRoutes)
app.use('/api/forum',forumRoutes)
app.use('/api/notice',noticeRoutes)
app.use('/api/scheme', schemeRoutes)
app.use('/api/localadmin', localAdminsRoutes)
app.use('/api/centaladmin', centralAdminRoutes)


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
