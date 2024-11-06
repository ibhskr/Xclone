import User from "../../models/User.js";

// follow user
export const followUser = async (req, res) => {
  try {
    const follower_id = req.user.id;
    const followee_id = req.params.id;

    if (follower_id === followee_id) {
      return res.status(400).json({
        success: false,
        message: "You cannot follow yourself",
      });
    }

    const followee = await User.findById(followee_id);
    const follower = await User.findById(follower_id);

    if (!followee || !follower) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (followee.followers.includes(follower_id)) {
      return res.status(400).json({
        success: false,
        message: "You are already following this user",
      });
    }

    followee.followers.push(follower_id);
    follower.following.push(followee_id);

    await followee.save();
    await follower.save();

    return res.status(200).json({
      success: true,
      message: "User followed successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to follow user. Please try again later.",
    });
  }
};
