import express from 'express'
import { blogDetail, categoryCollection, createBlog, showPost, specificCategory,  } from '../controllers/blog.controller.js';
import upload from '../config/multer.js';
import { addBookmarks } from '../controllers/bookmarks.controller.js';

const BlogRouter = express.Router();

BlogRouter.post('/create', upload.single('file') ,createBlog)
BlogRouter.get('/post' ,showPost)
BlogRouter.get("/post/detail/:id", blogDetail);
BlogRouter.get("/post/categories", categoryCollection);
BlogRouter.get("/post/categories/:category", specificCategory);
BlogRouter.get("/bookmark/addblog",addBookmarks)


export default BlogRouter