import User from "../../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { secret } from "../../config/env.js";

// register
export const register = async (req, res) => {
  try {
    const { username, name, email, password } = req.body;

    // Check if the user already exists
    const isUser = await User.findOne({ username });
    if (isUser) {
      return res.status(403).json({
        success: false,
        message: `Username already exists: @${username}`,
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create and save the new user
    const newUser = await User.create({
      username,
      name,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      success: true,
      message: `User created successfully. Welcome, ${name}!`,
      userId: newUser._id,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
