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




const router = Router()


router.route("/posts").get(getPosts)

router.route("/posts").post(createPost)

router.route('/:postId').delete( deletePost)




router.route("/posts/:postId/like").post(addLikeToPost)


router.route("/posts/:postId/like").delete(removeLikeFrompost)

router.route("/post/:postId/comments").get(getComment)

router.route("/posts/:postId/comments").post(createComment)


router.route("/posts/comment/:commentId").delete(deleteComment)

router.route("/posts/comments/:commentId/like").post(addLikeToComment)

router.route("/posts/comments/:commentid/likes").delete( removeLikeToComment)


export default router