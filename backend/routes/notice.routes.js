import { Router } from "express";
import { getNotice,getNoticeById } from "../controllers/notice.controller.js";

import { validate } from "../middlewares/validate.middleware.js";
import { param, body } from "express-validator";




const router = Router()


router.route("/").get(getNotice)
router.route("/:noticeId").get([
    param('noticeId').isMongoId().withMessage('Invalid notice Id'),
],validate,getNoticeById)



export default router
