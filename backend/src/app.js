import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";
import helmet from "helmet"
import rateLimit from "express-rate-limit"
import fs from 'fs'
import path from "path";
import { fileURLToPath } from "url";

const app = express()


app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadsDir = path.join(__dirname, 'public');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}


app.use(helmet());


app.use(express.json());
app.use(express.urlencoded({extended: true,limit:"16kb"}))
app.use(express.static('public'));
app.use(cookieParser())
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));
app.use('/public',express.static(uploadsDir))

app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ message: err.message });
  } else if (err) {
    return res.status(400).json({ message: err.message });
  }
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong on uploading!' });
});



// routes

import eventRoutes from './routes/event.routes.js';
import forumRoutes from './routes/forum.routes.js';
import noticeRoutes from './routes/notice.routes.js'
import schemeRoutes from './routes/schemes.routes.js'
import centralRoutes from './routes/centraladmin.routes.js'
import localRoutes from './routes/localadmin.routes.js'


//DECLARATION


app.use('/api/events',eventRoutes)
app.use('/api/forum',forumRoutes)
app.use('/api/notice',noticeRoutes)
app.use('/api/scheme', schemeRoutes)
app.use('/api/centraladmin', centralRoutes)
app.use('/api/localadmin', localRoutes)




export {app}