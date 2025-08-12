import { Router } from "express";

import { allUser,
    getNotice,
    createEvent,
    updateEvent,
    deleteEvent,
    createNotice,
    updateNotice,
    deleteNotice} from '../controllers/localAdmin.controller.js'

import upload from "../middlewares/multer.middleware.js";


const router = Router()


router.route('/').get(allUser)

router.route('/get').get(getNotice)

router.route('/event').post(upload.single('image'),createEvent)

router.route('/notice').put(upload.single('image'),updateEvent)

router.route('/:eventid').delete(deleteEvent)

router.route('/notice').post(upload.single('image'),createNotice)

router.route('/notice').put(upload.single('image'),updateNotice)

router.route('/:noticeid').delete(deleteNotice)



export default router