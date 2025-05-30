import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
  avatar: {
    type: String,
   
  },
  bio : {
    type: String,
       
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});


export const User = new mongoose.model("User", userSchema);