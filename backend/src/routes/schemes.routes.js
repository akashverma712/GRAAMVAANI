import { Router } from "express";

import {  scheme_detail,
  scheme_List,
  central_Scheme_List,
  scheme_Create,
  scheme_Update,
  scheme_Delete } from "../controllers/governmentscheme.controller.js";

  import upload from "../middlewares/multer.middleware.js";




const router = Router()

router.route('/').get(scheme_List)

router.route('/:id').get(scheme_detail)

router.route('/:central').get(central_Scheme_List)

router.route('/').post(upload.single('image'),scheme_Create)

router.route('/').put(upload.single('image'),scheme_Update)

router.route('/:schemeid').delete(scheme_Delete)


export default router