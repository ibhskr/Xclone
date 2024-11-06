import User from "../../models/User.js";

// unfollow user
export const unfollowUser = async (req, res) => {
  try {
    const follower_id = req.user.id;
    const followee_id = req.params.id;

    const followee = await User.findById(followee_id);
    const follower = await User.findById(follower_id);

    if (!followee || !follower) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (!followee.followers.includes(follower_id)) {
      return res.status(400).json({
        success: false,
        message: "You are not following this user",
      });
    }

    followee.followers = followee.followers.filter(
      (id) => id.toString() !== follower_id
    );
    follower.following = follower.following.filter(
      (id) => id.toString() !== followee_id
    );

    await followee.save();
    await follower.save();

    return res.status(200).json({
      success: true,
      message: "User unfollowed successfully",
    });
  } catch (error) {
    console.error("Error unfollowing user:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to unfollow user. Please try again later.",
    });
  }
};
