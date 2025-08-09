import { Router } from "express";

import { localAdmin,
    verifyLocalAdmin,
    createEvent,
    updateEvent,
    deleteEvent,
    createNotice,
    updateNotice,
    deleteNotice } from '../controllers/centralAdmin.controller.js'
    
    

    const router = Router()


    router.route('/').get(localAdmin)

    router.route('/:verifyid').post(verifyLocalAdmin)

    router.route('/event').post(createEvent)

    router.route('/event').put(updateEvent)

    router.route('/:eventid').delete(deleteEvent)

    router.route('/notice').post(createNotice)

    router.route('/notice').put(updateNotice)

    router.route('/:noticeid').delete(deleteNotice)


    export default router