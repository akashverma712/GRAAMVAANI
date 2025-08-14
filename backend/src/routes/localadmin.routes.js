import { Router } from "express";

import { allUser,
    getNotice,
    createEvent,
    updateEvent,
    deleteEvent,
    createNotice,
    updateNotice,
    deleteNotice} from '../controllers/localAdmin.controller.js'

import multerMiddleware from "../middlewares/multer.middleware.js";
import requireAuth from "../middlewares/auth.middleware.js";


const router = Router()


router.route('/').get(allUser)

router.route('/get').get(getNotice)

router.route('/event').post(requireAuth,multerMiddleware,createEvent)

router.route('/notic/:id').put(updateEvent)

router.route('/:event/:id').delete(deleteEvent)

router.route('/notice').post(createNotice)

router.route('/notice/:id').put(updateNotice)

router.route('/:notice/:id').delete(deleteNotice)



export default router