// Profile Picture Upload Handler (profilePicture.js)
import { upload } from "../../config/cloudinaryConfig.js"; // Import the Multer config
import User from "../../models/User.js";

export const profilePicture = async (req, res) => {
  try {
    const userId = req.user.id;
    // Check if file was uploaded
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // The file was uploaded to Cloudinary, and req.file contains file details
    // console.log(req.file);

    // update the url into user database
    await User.findByIdAndUpdate(userId, { profilePicture: req.file.path });
    // Respond to the frontend with the Cloudinary URL of the uploaded file
    return res.status(200).json({
      success: true,
      message: "Profile picture uploaded successfully",
      url: req.file.path, // Cloudinary URL
    });
  } catch (error) {
    // console.error("Error uploading file:", error);
    return res
      .status(500)
      .json({ success: false, message: "Profile picture upload failed" });
  }
};
