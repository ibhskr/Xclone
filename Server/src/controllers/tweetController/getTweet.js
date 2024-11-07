import Tweet from "../../models/Tweet.js";
import User from "../../models/User.js";
import Comment from "../../models/Comment.js";
// ?following=true
export const getTweets = async (req, res) => {
  try {
    const following = req.query.following === "true";

    if (following) {
      const user_id = req.user.id;
      // Retrieve tweets from users the current user follows
      const user = await User.findById(user_id, "following").populate(
        "following",
        "id"
      ); //populate following and get only id

      // Get IDs of followed users
      const followingIds = user.following.map((user) => user._id);

      // Find tweets from followed users
      const tweets = await Tweet.find({ author: { $in: followingIds } })
        .sort({
          createdAt: -1,
        }) // Sort by latest tweets
        .populate("author", "username profilePicture name isVerified"); //populate author details only username and name , _id will get default

      return res.status(200).json({
        success: true,
        message: "following tweets retrieved successfully",
        tweets,
      });
    } else {
      const tweets = await Tweet.find()
        .sort({ createdAt: -1 })
        .populate("author", "username name isVerified profilePicture"); // //populate author details only username and name , _id will get default

      return res.status(200).json({
        success: true,
        message: "tweets retrieved successfully",
        tweets,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve tweets. Please try again later.",
    });
  }
};
