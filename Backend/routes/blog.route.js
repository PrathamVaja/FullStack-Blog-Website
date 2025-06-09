import express from 'express'
import { blogDetail, blogRecommendation, categoryCollection, createBlog, showPost, specificCategory,  } from '../controllers/blog.controller.js';
import upload from '../config/multer.js';
import { addBookmark, removeBookmark, showBookmarkedBlog } from '../controllers/bookmarks.controller.js';

const BlogRouter = express.Router();

BlogRouter.post('/create', upload.single('file') ,createBlog)
BlogRouter.get('/post' ,showPost)
BlogRouter.get("/post/detail/:id", blogDetail);
BlogRouter.get("/post/categories", categoryCollection);
BlogRouter.get("/post/categories/:category", specificCategory);
BlogRouter.post("/bookmark/add",addBookmark)
BlogRouter.post("/bookmark/remove",removeBookmark)
BlogRouter.get("/bookmark/showbookmark", showBookmarkedBlog)
BlogRouter.get("/recommendation/", blogRecommendation)



export default BlogRouter