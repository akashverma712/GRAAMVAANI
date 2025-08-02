import { Router } from "express";

import { getScheme, createScheme,deleteScheme,updateScheme,getSchemeById } from "../controllers/governmentscheme.controller.js";
import { protect, official } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { param, body } from "express-validator";



const router = Router()

router.route('/').get(getScheme)

router.route("/:schemeid").get([
    param('schemeId').isMongoId().withMessage('Invalid scheme ID'),
],validate,getSchemeById)

router.route('/').post(protect,official,[
  body('name').notEmpty().withMessage('Name is required').trim().escape(),
  body('category').notEmpty().withMessage('Category is required').isIn(['health', 'agriculture', 'general', 'schemes']).withMessage('Invalid category'),
  body('audioUrl').optional().isURL().withMessage('Invalid audio URL'),
  body('media').optional().isArray().withMessage('Media must be an array'),
  body('media.*').optional().isURL().withMessage('Invalid media URL'),
  body('description').optional().trim().escape(),
  body('eligibility').optional().trim().escape(),
  body('applicationProcess').optional().trim().escape(),
  body('deadlines').optional().isISO8601().withMessage('Invalid date format'),   
],validate,createScheme)

router.route("/:schemeid").put(protect,official,[
  param('schemeId').isMongoId().withMessage('Invalid scheme ID'),
  body('name').optional().notEmpty().withMessage('Name cannot be empty').trim().escape(),
  body('category').optional().isIn(['health', 'agriculture', 'general', 'schemes']).withMessage('Invalid category'),
  body('audioUrl').optional().isURL().withMessage('Invalid audio URL'),
  body('media').optional().isArray().withMessage('Media must be an array'),
  body('media.*').optional().isURL().withMessage('Invalid media URL'),
  body('description').optional().trim().escape(),
  body('eligibility').optional().trim().escape(),
  body('applicationProcess').optional().trim().escape(),
  body('deadlines').optional().isISO8601().withMessage('Invalid date format'),  
],validate,updateScheme)

router.route("/:schemeid").delete(protect,official,[
  param('schemeId').isMongoId().withMessage('Invalid scheme ID'),
     
],validate,deleteScheme)


export default router