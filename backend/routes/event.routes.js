import { Router } from "express";

import { getEvents,  getEventById } from "../controllers/event.controller.js";

import { validate } from "../middlewares/validate.middleware.js";
import { param, body } from "express-validator";



const router = Router()


router.route("/").get(getEvents)
router.route("/:eventid").get([
    param('eventId').isMongoId().withMessage('Invalid event ID'),
],validate,getEventById)



export default router