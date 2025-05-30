import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  banner: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: [
      "Business",
      "Travel",
      "Technology",
      "Food",
      "Lifestyle",
      "Education",
    ],
  },
  description: {
    type: String,
    required: true,
  },

  bookmark: {
    type: Boolean,
    default: false,
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export const Blog = new mongoose.model("Blog", blogSchema);
