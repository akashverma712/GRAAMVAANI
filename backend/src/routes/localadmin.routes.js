import { Router } from "express";

import { allUser,
    createEvent,
    updateEvent,
    deleteEvent,
    createNotice,
    updateNotice,
    deleteNotice} from '../controllers/localAdmin.controller.js'




const router = Router()


router.route('/').get(allUser)

router.route('/event').post(createEvent)

router.route('/notice').put(updateEvent)

router.route('/:eventid').delete(deleteEvent)

router.route('/notice').post(createNotice)

router.route('/notice').put(updateNotice)

router.route('/:noticeid').delete(deleteNotice)



export default router