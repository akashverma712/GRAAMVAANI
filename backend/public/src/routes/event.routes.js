import { Router } from "express";

import { getEvents, createEvent } from "../controllers/event.controller.js";
import { protect, official } from "../middlewares/auth.middleware.js";
import { body } from "express-validator";
import { validate } from "../middlewares/validate.middleware.js";



const router = Router()


router.route("/getevent").get(getEvents)

router.route('/events').post(protect,validate,official,createEvent)