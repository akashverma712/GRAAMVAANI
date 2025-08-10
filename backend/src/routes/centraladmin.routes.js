import { Router } from "express";

import { localAdmin,
    verifyLocalAdmin,
    createEvent,
    updateEvent,
    deleteEvent,
    createNotice,
    updateNotice,
    deleteNotice } from '../controllers/centralAdmin.controller.js'
    
    import upload from "../middlewares/multer.middleware.js";
    

    const router = Router()


    router.route('/').get(localAdmin)

    router.route('/:verifyid').post(verifyLocalAdmin)

    router.route('/event').post(upload.single('image'),createEvent)

    router.route('/event').put(upload.single('image'),updateEvent)

    router.route('/:eventid').delete(deleteEvent)

    router.route('/notice').post(upload.single('image'), createNotice)

    router.route('/notice').put(upload.single('image'),updateNotice)

    router.route('/:noticeid').delete(deleteNotice)


    export default router