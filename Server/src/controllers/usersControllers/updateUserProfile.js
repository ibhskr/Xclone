import User from "../../models/User.js";

export const updateUserProfile = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { name, email, profession, bio, location } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      user_id,
      { name, bio, email, profession, location },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update profile. Please try again later.",
    });
  }
};
