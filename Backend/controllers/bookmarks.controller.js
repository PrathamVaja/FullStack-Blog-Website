import { Blog } from "../models/blog.model.js";
import { BookmarkBlogs } from "../models/bookmarks.model.js";
import { User } from "../models/user.model.js";

export const addBookmarks = async (req, res) => {
  const { blogid, userid } = req.query;

  try {
    const filterUser = await User.findById(userid);
    if (!filterUser) {
      return res.status(401).json({ message: "User not found" });
    }

    const filterBlog = await Blog.findById(blogid);
    if (!filterBlog) {
      return res.status(401).json({ message: "Blog not found" });
    }

    // Check if bookmark already exists
    const existingBookmark = await BookmarkBlogs.findOne({
      user: userid,
      blog: blogid,
    });

    if (existingBookmark) {
      return res.status(409).json({ message: "Bookmark already exists" });
    }

    const createBookMark = await BookmarkBlogs.create({
      user: userid,
      blog: blogid,
    });

    return res.status(201).json({ message: "Bookmark added", createBookMark });
  } catch (error) {
    console.error("Error in addBookmarks:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
