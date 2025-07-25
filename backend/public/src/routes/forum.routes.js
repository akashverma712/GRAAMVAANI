import {Router} from 'express'

import { createPost, getPosts,getComment,createComment } from '../controllers/forum.controller.js'
import { protect} from '../middlewares/auth.middleware.js'
import { validate } from '../middlewares/validate.middleware.js'


const router = Router()


router.route("/posts").get(getPosts)

router.route("/posts").post(protect,validate,createPost)

router.route("/post/:postId/comments").get(validate,getComment)

router.route("/posts/:postId/comments").post(protect,validate,createComment)