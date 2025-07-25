import { ForumPost } from "../models/Forum.model.js";
import { ForumComment } from "../models/ForumComment.model.js";
import { asyncHandler } from "../utils/Asynchandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import winston from "winston";






const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
})

const getPosts = asyncHandler(async(req,res)=>{
   try {
     const posts = await ForumPost.find().populate('author', 'name')
 
     return res.status(200).json(
         new ApiResponse(
             200,
             {posts},
             "Post found"
         )
     )
   } catch (error) {
    logger.error(`Get forum posts error: ${error.message}`);

    throw new ApiError(500, 'Server error to find the post')

   }
})



const createPost = asyncHandler(async(req, res)=>{

    const {title, content, category, isAnonymous} = req.body
try {
    
        const post = new ForumPost({
            title,
            content,
            category,
            author: req.user.id,
            isAnonymous,
        })
        await post.save()
        logger.info(`Forum post created: ${post._id} by user ${req.user.id}`);

    
        return res.status(200).json(
            new ApiResponse(
                200,
                {post},
                "Post Created"
            )
        )
} catch (error) {
     logger.error(`Create forum post error: ${error.message}`);

    throw new ApiError(500, "Due to server error post not created")
}
})



const getComment = asyncHandler(async(req, res)=>{

    try {
        const {postId} = req.params
    
        const comment = await ForumComment.findOne({post: postId})
        .populate('author','name')
    
        return res.status(200).json(
            new ApiResponse(
                200,
                {comment},
                'Got the post'
            )
        )
    
    } catch (error) {
            logger.error(`Get comments error: ${error.message}`);

        throw new ApiError(500, 'Comment not fetched due to server error')
        
    }
})



const createComment = asyncHandler(async(req, res)=>{

const { postId } = req.params;
const { content, isAnonymous }= req.body

try {
    const comment = new ForumComment({
        content, 
        post: postId,
        author: rq.user.id,
        isAnonymous
    })
    
    await comment.save()
    logger.info(`Comment created: ${comment._id} on post ${postId}`);

    
    return res.status(200).json(
        new ApiResponse(
            200,
            {comment},
            'New Comment created'
    
        )
    )
} catch (error) {
       logger.error(`Create comment error: ${error.message}`);

    throw new ApiError(500, "Comment not created due to server error")
    
}

})


export {
    getPosts,
    createPost,
    getComment,
    createComment
}


