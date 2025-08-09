import {Router} from 'express'

import {  getPosts,
    createPost,
    getComment,
    createComment,
    addLikeToPost,
    removeLikeFrompost,
    addLikeToComment,
    removeLikeToComment,
    deleteComment,
    deletePost } from '../controllers/forum.controller.js'

import { validate } from '../middlewares/validate.middleware.js'



const router = Router()


router.route("/posts").get(validate,getPosts)

router.route("/posts").post(validate,createPost)

router.route('/:postId').delete( validate, deletePost)




router.route("/posts/:postId/like").post( validate,addLikeToPost)


router.route("/posts/:postId/like").delete(validate,removeLikeFrompost)

router.route("/post/:postId/comments").get(validate,getComment)

router.route("/posts/:postId/comments").post(validate,createComment)


router.route("/posts/comment/:commentId").delete( validate, deleteComment)

router.route("/posts/comments/:commentId/like").post(validate,addLikeToComment)

router.route("/posts/comments/:commentid/likes").delete( validate, removeLikeToComment)


export default router