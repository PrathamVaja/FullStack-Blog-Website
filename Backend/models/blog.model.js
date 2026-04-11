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
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
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

export const Blog =  mongoose.model("Blog", blogSchema);
