import { Blog } from "../models/blog.model.js";
import cloudinary from "../config/cloudinary.js";

export const createBlog = async (req, res) => {
  try {
      const { title, description, category, createdAt } = req.body;
     

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
      createdAt: createdAt || new Date(),
    });

    res.status(201).json({ message: "Blog created successfully", blog });
  } catch (error) {
    console.error("Error creating blog:", error);
    res.status(500).json({ message: "Server error while creating blog" });
  }
};


export const showPost = async (req, res) => {
  
  const blog = await Blog.find()


  if (!blog) {
    res.status(401).json({message:'Blogs are not exist'})
  }
res.status(200).json({message:'blogs', blog})
  
}



export const blogDetail = async (req, res) => {
  const { id } = req.params;
 


  const blog = await Blog.findById(id);

  if (!blog) {
   return res.status(401).json({ message: 'Blog not exist' });
  }

  res.status(200).json({message:'Blog Detail',blog})
}


//show number of blogs of each category

export const categoryCollection = async (req,res) => {
  const blogs = await Blog.find()

  let category = [];
  blogs.map((ele) => {
    if (!category.includes(ele.category)) {
      category.push(ele.category);
    }
  });
  let listcategory = [];
  category
    .map((categoryfilter) => {
      let singleCategoryData = blogs.filter((ele) => {
        return ele.category == categoryfilter;
      });
      listcategory.push({
        name: categoryfilter,
        length: singleCategoryData.length,
      });
    })
   
  
  res.status(200).json({ listcategory });

}


export const specificCategory = async (req, res) => {
  try {
    const  {category}  = req.params;

    const blogs = await Blog.find({ category });

    console.log(blogs)

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
