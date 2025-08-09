import { ForumPost } from "../models/Forum.model.js";
import { ForumComment } from "../models/ForumComment.model.js";
import { asyncHandler } from "../utils/Asynchandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/User.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

import { param, query, body, validationResult } from "express-validator";








const getPosts =[
query('page').optional().isInt({ min: 1}),
query('limit').optional().isInt({ min: 1, max: 50 }),
query('search').optional().trim().escape(),

    asyncHandler(async(req,res)=>{

        const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  
    try {
       const {page = 1, limit=10, category, search } = req.query

       let query = {}
       if (category) query.category =  category
       if (search)  query.$or =  [
        {
            title: {
                $regex: search, $option: 'i'
            }
        },
        {
            content:{
                $regex: search, $option: 'i'
            }
        }
       ]

     const posts = await ForumPost.find(query)
     .populate('author', 'name profilePicture')
     .sort({ createdAt: -1})
     .skip(( page -1 ) * limit)
     .limit(parseInt(limit))
     .lean()

     const total = await ForumPost.countDocuments(query)
 
     return res.status(200).json(
         new ApiResponse(
             200,
             {posts , total, page: parseInt(page),
                 pages: Math.cell(total/limit)},
             "Post found"
         )
     )
   } catch (error) {
    

    throw new ApiError(500, 'Server error to find the post')

   }
})
]


const createPost =[
     body('title').notEmpty().withMessage('title is required').trim().escape(),
     body('content').notEmpty().withMessage('Content is required').trim().escape(),
     body('category').optional().isIn(['health', 'agriculture', 'general','schemes']),
     body('isAnonyous').optional().isBoolean(),


    asyncHandler(async(req, res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const {title, content, category, isAnonymous} = req.body
try {
    
        const post = new ForumPost({
            title,
            content,
            media: req.files ? req.files.map(file => file.path) : [] ,
            category,
            author: req.user.id,
            isAnonymous,
        })
        await post.save()
      

    const users = await User.find({ subscriptions: 'forum' }).select('phone');
    const phoneNumbers = users.map(user => user.phone).filter(phone => phone);
    if (phoneNumbers.length > 0) {
      await sendSMS(phoneNumbers, `New forum post: ${title}`);
    }
    
        return res.status(200).json(
            new ApiResponse(
                200,
                {post},
                "Post Created"
            )
        )
} catch (error) {
    

    throw new ApiError(500, "Due to server error post not created")
}
})
]


const getComment =[

     param('postId').isMongoId().withMessage('Invalid Post id'),

asyncHandler(async(req, res)=>{
     const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
        const {postId} = req.params
    
        const comment = await ForumComment.findOne({ post: postId })
        .populate('author','name profilePicture')
        .lean()
    
        return res.status(200).json(
            new ApiResponse(
                200,
                {comment},
                'Got the Comment'
            )
        )
    
    } catch (error) {
        

        throw new ApiError(500, 'Comment not fetched due to server error')
        
    }
})
]


const createComment = [
     param('postId').isMongoId().withMessage('Invalid post Id'),
     body('content').notEmpty().withMessage('Content is Required').trim().escape(),
     body('parentComment').optional().isMongoId().withMessage('Invalid parent comment ID'),

asyncHandler(async(req, res)=>{
     const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

const { postId } = req.params;
const { content, parentComment, isAnonymous }= req.body

try {

    const post = await ForumPost.findById(postId)
    if (!post) {
        throw new ApiError(402, "Post not found for parent comment")
    }

    if (parentComment) {
        const parent = await ForumComment.findById(parentComment)

        if (!parent) {
            throw new ApiError(403, "Parent comment not found")
        }
    }



    const comment = new ForumComment({
        content, 
        author: req.user.id,
        post: postId,
        parentComment,
        isAnonymous
    })
    
    await comment.save()

    const populateComment = await ForumComment.findById(comment._id)
    .populate('author', 'name profilePicture')
    .lean()
   

    
    return res.status(200).json(
        new ApiResponse(
            200,
            {comment: populateComment},
            'New Comment created'
    
        )
    )
} catch (error) {
      

    throw new ApiError(500, "Comment not created due to server error")
    
}

})
]


const addLikeToPost =[
   
      param('postId').isMongoId().withMessage('Invalid post ID'),

 asyncHandler(async(req, res)=>{
     const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { postId } = req.params
    try {
        const post = await ForumPost.findById( postId )
        if (!post) {
            throw new ApiError(402, "post not found")
        }
        if (post.likes.includes(req.user.id)) {
            throw new ApiError(404, "Post already liked")
        }

         post.likes.push(req.user.id)
        await post .save()
     

        return res.status(201).json(
            new ApiResponse(
                200,
                {likes: post.likes.length},
                "Liked the post"
            )
        )

    } catch (error) {
    
    throw new ApiError(500,error?.message || "server error Failed to like the post")
    }
})
]


const removeLikeFrompost =[
  
     param('postId').isMongoId().withMessage('Invalid post ID'),

 asyncHandler(async(req, res)=>{

     const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { postId } = req.params
    try {
        
        const post = await ForumPost.findById(postId)
        if (!post) {
            throw new ApiError(401, "Post not found ")
        }
        if (!post.likes.includes(req.user.id)) {
            throw new ApiError(402, "Post not Liked Yet")
        }
         post.likes.filter(userId =>
         userId.toString() !== req.user.id.toString())
        
        await post.save()

   
      return res.status(201).json(
        new ApiResponse(
            201,
            { likes: post.likes.length},
            "Post unliked succesfully"

        )
      )


    } catch (error) {
    
        throw new ApiError(500, error?.message || "Server error to dislike the post")
    }
}) 
]


const addLikeToComment =[
  
      param('commentId').isMongoId().withMessage('Invalid comment ID'),

 asyncHandler(async(req, res)=>{
     const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { commentId } = req.params
    try {
        const comment = await ForumComment.findById(commentId)

        if (!comment) {
            throw new ApiError(402, "Comment not found ")
        }
         if (comment.likes.includes(req.user.id)) {
            throw new ApiError(401, "Comment already liked")
         }

         comment.likes.push(req.user.id)

        await comment.save()
   
     
    return res.status(201).json(
        new ApiResponse(
            201,
            {likes: comment.likes.length}
        )
    )

    } catch (error) {
   
     throw new ApiError(500, "Server error occured to like the comment")

    }
})
]


const removeLikeToComment =[

      param('commentId').isMongoId().withMessage('Invalid comment ID'),
  
 asyncHandler(async(req, res)=>{

     const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { commentId } = req.params

    try {
        const comment = await ForumComment.findById(commentId)
        if (!comment) {
            throw new ApiError(401, "Comment not found")
        }
        if (!comment.likes.includes(req.user.id)) {
            throw new ApiError(400, "Comment not Liked Yet")
        }
        
        comment.likes = comment.likes.filter(userId => userId.toString()
    !== req.user.id.toString()
    )
    await comment.save()
    


    return res.status(201).json(
        new ApiResponse(
             201,
             {likes: comment.likes.length},
             "Comment unliked Successfully"
        )
    )
        
    } catch (error) {

  
    throw new ApiError(501, error?.message || "Server error on dislike of comment")
        
    }
})
]



const deletePost =[

      param('postId').isMongoId().withMessage('Invalid post id'),

 asyncHandler(async(req, res)=>{

     const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { postId } = req.params
    try {
        
        const post = await ForumPost.findById( postId )
        if (!post) {
            throw new ApiError(404, "Post not found")
        }

        if (req.user.role !== 'admin' && post.author.toString() !== 
        req.user.id ) {
            throw new ApiError(403, '   Not authorized to delete this post')
        }

        await ForumComment.deleteMany({ post: postId })
        await post.remove()


    
    return res.status(201).json(
        new ApiResponse(
            200,
            null,
            "Post deleted successfully"
        )
    )


    } catch (error) {
 
     throw new ApiError(500, error?.message || "Server error on deleting post")
        
    }
})
]


const deleteComment =[

      param('commentId').isMongoId().withMessage('Invalid comment ID'),

 asyncHandler(async(req, res)=>{

     const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { commentId } = req.params

    try {
        const comment = await ForumComment.findById(commentId)

        if (!comment) {
            throw new ApiError(401, "Comment not found to delete")
        }
        if (req.user.role !== 'admin' && post.author.toString() !== 
        req.user.id ) {
            throw new ApiError(403, "Not Authorized to delete this comment")
            
        }

        await ForumComment.deleteMany({ parentComment: commentId })
        await comment.remove()

    

    return res.status(201).json(
        
        new ApiResponse(
            200,
            null,
            "Comment deleted Successfully"
        )

    )

    } catch (error) {
    
      throw new ApiError(500, error?.message || "comment not deleted due to server error")  
    }
})
]











export {
    getPosts,
    createPost,
    getComment,
    createComment,
    addLikeToPost,
    removeLikeFrompost,
    addLikeToComment,
    removeLikeToComment,
    deleteComment,
    deletePost
}


