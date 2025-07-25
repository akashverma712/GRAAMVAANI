import { Router } from "express";

import { getScheme, createScheme } from "../controllers/governmentscheme.controller.js";
import { protect, official } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";



const router = Router()

router.route('/scheme').get(getScheme)

router.route('/scheme').post(protect,official,validate,createScheme)