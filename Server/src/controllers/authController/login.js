import User from "../../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { secret } from "../../config/env.js";

// login
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Convert username to lowercase
    const lowercaseUsername = username.toLowerCase();

    // Check if the user exists
    const user = await User.findOne({ username: lowercaseUsername });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid password",
      });
    }

    // Create a JWT token
    const token = jwt.sign({ id: user._id, username: user.username }, secret, {
      expiresIn: "30d",
    });

    // Set the token as an HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 3600000,
      sameSite: "None", // Allows the cookie to be sent in cross-site requests
      secure: true, // Ensures the cookie is sent only over HTTPS
    });

    // Convert user to a plain object and delete the password
    const userObj = user.toObject();
    delete userObj.password;

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: userObj,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
