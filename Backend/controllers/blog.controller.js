import { Blog } from "../models/blog.model.js";
import cloudinary from "../config/cloudinary.js";
import { User } from "../models/user.model.js";

export const createBlog = async (req, res) => {
  try {
    const { title, description, category, userId, createdAt } = req.body;

    let bannerUrl = "";
    if (req.file) {
      try {
        // Upload to Cloudinary
        const uploadResult = await cloudinary.uploader.upload(req.file.path, {
          folder: "BlogBanners",
          resource_type: "auto",
        });
        bannerUrl = uploadResult.secure_url;
      } catch (err) {
        console.error("Banner upload error:", err);
        return res.status(500).json({ message: "Banner upload failed" });
      }
    } else {
      return res.status(400).json({ message: "Banner image is required" });
    }

    const blog = await Blog.create({
      banner: bannerUrl,
      title,
      category,
      description,
      user: userId,
      createdAt: createdAt || new Date(),
    });

    res.status(201).json({ message: "Blog created successfully", blog });
  } catch (error) {
    console.error("Error creating blog:", error);
    res.status(500).json({ message: "Server error while creating blog" });
  }
};

export const showPost = async (req, res) => {
  const blog = await Blog.find();

  if (!blog) {
    res.status(401).json({ message: "Blogs are not exist" });
  }
  res.status(200).json({ message: "blogs", blog });
};

export const blogDetail = async (req, res) => {
  const { id } = req.params;

  const blog = await Blog.findById(id);

  if (!blog) {
    return res.status(401).json({ message: "Blog not exist" });
  }

  res.status(200).json({ message: "Blog Detail", blog });
};

//show number of blogs of each category

export const categoryCollection = async (req, res) => {
  const blogs = await Blog.find();

  let category = [];
  blogs.map((ele) => {
    if (!category.includes(ele.category)) {
      category.push(ele.category);
    }
  });
  let listcategory = [];
  category.map((categoryfilter) => {
    let singleCategoryData = blogs.filter((ele) => {
      return ele.category == categoryfilter;
    });
    listcategory.push({
      name: categoryfilter,
      length: singleCategoryData.length,
    });
  });

  res.status(200).json({ listcategory });
};

export const specificCategory = async (req, res) => {
  try {
    const { category } = req.params;

    const blogs = await Blog.find({ category });

    if (!blogs || blogs.length === 0) {
      return res
        .status(404)
        .json({ message: "No blogs found for this category." });
    }

    return res.status(200).json({ blog: blogs });
  } catch (error) {
    console.error("Error fetching category blogs:", error);
    return res
      .status(500)
      .json({ message: "Server error. Please try again later." });
  }
};

export const blogRecommendation = async (req, res) => {
  try {
    const { category, id } = req.query;

    const removeDetailBlog = await Blog.findById(id);

    const blogs = await Blog.find({ category });

    const filteredBlogs = blogs.filter(
      (blog) => blog._id.toString() !== removeDetailBlog._id.toString(),
    );

    return res.status(200).json({ blog: filteredBlogs });
  } catch (error) {
    console.error("Error fetching category blogs:", error);
    return res
      .status(500)
      .json({ message: "Server error. Please try again later." });
  }
};

export const deleterBlog = async (req, res) => {
  const { blogId, userId } = req.body;
  const blog = await Blog.findById({ _id: blogId });

  if (!blog) {
    return res.status(404).json({ message: "Blog not found" });
  }

  if (blog.user.toString() !== userId) {
    return res
      .status(403)
      .json({ message: "Unauthorized to delete this blog" });
  }

  await Blog.findByIdAndDelete({ _id: blogId });
  const blogs = await Blog.find({ user: userId });
  return res.status(200).json({ message: "Blog deleted successfully", blogs });
};

export const myBlogs = async (req, res) => {
  const { userId } = req.query;

  const blog = await Blog.find({ user: userId });

  if (!blog || blog.length === 0) {
    return res.status(401).json({ message: "No blogs found for this user" });
  }

  res.status(200).json({ message: "My Blogs", blog });
};
