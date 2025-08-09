import { Router } from "express";

import { getEvents, getEventById } from "../controllers/event.controller.js";







const router = Router()


router.route("/").get(getEvents)

router.route("/:eventid").get(getEventById)




export default router