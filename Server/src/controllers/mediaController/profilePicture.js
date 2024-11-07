// Profile Picture Upload Handler (profilePicture.js)
import { v2 as cloudinary } from "cloudinary";
import User from "../../models/User.js";
import fs from "fs"; // You might use fs if you're cleaning up files after uploading

export const profilePicture = async (req, res) => {
  const userId = req.user.id;
  try {
    // Check if file was uploaded
    if (!req.file) {
      console.log("No file uploaded");
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Upload the image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "xclone", // Define folder in Cloudinary
    });

    await User.findByIdAndUpdate(userId, { profilePicture: result.secure_url });

    // Return the Cloudinary URL to the client
    return res.status(200).json({
      success: true,
      message: "Profile picture uploaded successfully",
      url: result.secure_url, // Use the secure URL provided by Cloudinary
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    return res.status(500).json({
      success: false,
      message: "Profile picture upload failed",
    });
  } finally {
    // Delete the file from local storage after uploading (optional but recommended)

    fs.unlink(req.file.path, (err) => {
      if (err) console.error("Error deleting file:", err);
    });
  }
};
