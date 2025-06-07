import { BookmarkBlogs } from "../models/bookmarks.model.js";

export const addBookmark = async (req, res) => {
  const { blogId, userId } = req.body;
  try {
    let bookmark = await BookmarkBlogs.findOne({ user: userId });
    if (!bookmark) {
      bookmark = await BookmarkBlogs.create({ user: userId, blogs: [blogId] });
    } else if (!bookmark.blogs.includes(blogId)) {
      bookmark.blogs.push(blogId);
      await bookmark.save();
    }
    res.status(201).json({ message: "Bookmarked" });
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "Error bookmarking" });
  }
};

export const removeBookmark = async (req, res) => {
  const { blogId, userId } = req.body;
  try {
    const bookmark = await BookmarkBlogs.findOne({ user: userId });
    if (bookmark) {
      bookmark.blogs = bookmark.blogs.filter((id) => id.toString() !== blogId);
      await bookmark.save();
    }
    res.status(200).json({ message: "Bookmark removed" });
  } catch (err) {
    res.status(500).json({ message: "Error removing bookmark" });
  }
};

export const showBookmarkedBlog = async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) return res.status(400).json({ message: "userId required" });
    const blogs = await BookmarkBlogs.findOne({ user: userId }).populate(
      "blogs"
    );
    res.status(200).json({ blogs });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error in bookmark" });
  }
};
