import { Router } from "express";

import { getEvents, createEvent, updateEvent, deleteEvent, getEventById } from "../controllers/event.controller.js";
import {  official } from "../middlewares/auth.middleware.js";

import { validate } from "../middlewares/validate.middleware.js";
import { param, body } from "express-validator";



const router = Router()


router.route("/").get(getEvents)
router.route("/:eventid").get([
    param('eventId').isMongoId().withMessage('Invalid event ID'),
],validate,getEventById)

router.route('/').post(official,[
  body('title').notEmpty().withMessage('Title is required').trim().escape(),
  body('date').isISO8601().withMessage('Date must be a valid date'),
  body('location').notEmpty().withMessage('Location is required').trim().escape(),
  body('description').optional().trim().escape(),
  body('audioUrl').optional().isURL().withMessage('Invalid audio URL'),
],validate,createEvent)
router.route("/").put(official,[
   param('eventId').isMongoId().withMessage('Invalid event ID'),
  body('title').optional().notEmpty().withMessage('Title cannot be empty').trim().escape(),
  body('date').optional().isISO8601().withMessage('Date must be a valid date'),
  body('location').optional().notEmpty().withMessage('Location cannot be empty').trim().escape(),
  body('description').optional().trim().escape(),
  body('audioUrl').optional().isURL().withMessage('Invalid audio URL'),
],validate,updateEvent)
router.route('/:eventId').delete(official,[
    param('eventId').isMongoId().withMessage('Invalid event ID')
],validate,deleteEvent)


export default router