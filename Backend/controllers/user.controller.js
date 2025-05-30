import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import cloudinary from "../config/cloudinary.js";

export const userRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const checkUser = await User.findOne({ email });

    if (checkUser) {
      res.status(409).json({ message: "User already exist !" });
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(200).json({
      message: "User Registered !",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    const checkPassword = await bcryptjs.compare(password, user.password);

    if (!checkPassword) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET
    );

    res.cookie("token", token);

    res.status(200).json({
      message: "Login successful.",
      user,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const userLogout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Logout successful." });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const userUpdate = async (req, res) => {
  try {
    const { userid } = req.params;
    const { name, email, bio } = req.body;

    const user = await User.findById(userid);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.name = name ?? user.name;
    user.email = email ?? user.email;
    user.bio = bio ?? user.bio;

    if (req.file) {
      try {
        const uploadResult = await cloudinary.uploader.upload(req.file.path, {
          folder: "Blog",
          resource_type: "auto",
        });
        if (!uploadResult.secure_url) {
          throw new Error("Missing secure_url in upload result");
        }
        user.avatar = uploadResult.secure_url;
      } catch (uploadErr) {
        console.error("Image upload error:", uploadErr);
        return res.status(500).json({ message: "Image upload failed" });
      }
    }

    await user.save();

    res.status(200).json({ message: "Update successful.", user });
  } catch (error) {
    console.error("User update failed:", error);
    res.status(400).json({ message: error.message });
  }
};
