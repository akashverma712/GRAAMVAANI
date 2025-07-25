import { Router } from "express";
import { getNotice, createNotice } from "../controllers/notice.controller.js";
import { protect, official } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";




const router = Router()


router.route("/").get(getNotice)
router.route("/", protect, official,validate, createNotice)
