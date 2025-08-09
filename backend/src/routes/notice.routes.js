import { Router } from "express";
import { getNotice,getNoticeById} from "../controllers/notice.controller.js";







const router = Router()


router.route("/").get(getNotice)

router.route("/:noticeId").get(getNoticeById)


export default router