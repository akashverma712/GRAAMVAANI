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
import { body, query, param } from 'express-validator'


const router = Router()


router.route("/posts").get([
    query('page').optional().isInt({ min: 1}),
    query('limit').optional().isInt({ min: 1, max: 50 }),
    query('search').optional().trim().escape()
],validate,getPosts)

router.route("/posts").post([
    body('title').notEmpty().withMessage('title is required').trim().escape(),
    body('content').notEmpty().withMessage('Content is required').trim().escape(),
    body('category').optional().isIn(['health', 'agriculture', 'general','schemes']),
    body('isAnonyous').optional().isBoolean()
],validate,createPost)

router.route('/:postId').delete([
    param('postId').isMongoId().withMessage('Invalid post id')
], validate, deletePost)




router.route("/posts/:postId/like").post([
    param('postId').isMongoId().withMessage('Invalid post ID')
], validate,addLikeToPost)


router.route("/posts/:postId/like").delete([
    param('postId').isMongoId().withMessage('Invalid post ID')
],validate,removeLikeFrompost)

router.route("/post/:postId/comments").get([
    param('postId').isMongoId().withMessage('Invalid Post id')
],validate,getComment)

router.route("/posts/:postId/comments").post([
    param('postId').isMongoId().withMessage('Invalid post Id'),
    body('content').notEmpty().withMessage('Content is Required').trim().escape(),
    body('parentComment').optional().isMongoId().withMessage('Invalid parent comment ID')
],validate,createComment)


router.route("/posts/comment/:commentId").delete([
    param('commentId').isMongoId().withMessage('Invalid comment ID')
], validate, deleteComment)

router.route("/posts/comments/:commentId/like").post([
    param('commentId').isMongoId().withMessage('Invalid comment ID')
],validate,addLikeToComment)

router.route("/posts/comments/:commentid/likes").delete([
    param('commentId').isMongoId().withMessage('Invalid comment ID')
], validate, removeLikeToComment)


export default router