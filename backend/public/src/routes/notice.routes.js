import { Router } from "express";
import { getNotice,getNoticeById, createNotice, updateNotice, deleteNotice } from "../controllers/notice.controller.js";
import { protect, official } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { param, body } from "express-validator";




const router = Router()


router.route("/").get(getNotice)
router.route("/:noticeId").get([
    param('noticeId').isMongoId().withMessage('Invalid notice Id'),
],validate,getNoticeById)
router.route("/").post( protect, official,[
  body('title').notEmpty().withMessage('Title is required').trim().escape(),
  body('content').notEmpty().withMessage('Content is required').trim().escape(),
  body('category').notEmpty().withMessage('Category is required').isIn(['health', 'agriculture', 'general', 'schemes', 'forum']).withMessage('Invalid category'),
  body('audioUrl').optional().isURL().withMessage('Invalid audio URL'),  
],validate, createNotice)
router.route("/:noticeid").put(protect,official,[
 param('noticeId').isMongoId().withMessage('Invalid notice ID'),
  body('title').optional().notEmpty().withMessage('Title cannot be empty').trim().escape(),
  body('content').optional().notEmpty().withMessage('Content cannot be empty').trim().escape(),
  body('category').optional().isIn(['health', 'agriculture', 'general', 'schemes', 'forum']).withMessage('Invalid category'),
  body('audioUrl').optional().isURL().withMessage('Invalid audio URL'),   
],validate,updateNotice)
router.route("/:noticeid").delete(protect,official,[
 param('noticeId').isMongoId().withMessage('Invalid notice ID'),
],validate,deleteNotice)


export default router