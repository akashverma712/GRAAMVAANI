import express from "express";



import helmet from "helmet"


const app = express()


app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))



app.use(helmet());

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));


// routes

import authRoutes from './routes/authRoutes.js';
import eventRoutes from './routes/event.routes.js';
import forumRoutes from './routes/forum.routes.js';
import noticeRoutes from './routes/notice.routes.js'
import schemeRoutes from './routes/schemes.routes.js'


//DECLARATION


app.use('/api/auth', authRoutes);
app.use('/api/events',eventRoutes)
app.use('/api/forum',forumRoutes)
app.use('/api/notice',noticeRoutes)
app.use('/api/scheme', schemeRoutes)




export {app}