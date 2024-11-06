import User from "../../models/User.js";
import Tweet from "../../models/Tweet.js";

export const likeTweet = async (req, res) => {
  // console.log("like api hit");
  try {
    const { tweet_id } = req.params;
    const user_id = req.user.id;

    // Validate tweet ID
    if (!tweet_id) {
      return res.status(400).json({
        success: false,
        message: "Tweet ID is required",
      });
    }

    // Check if the tweet is already liked by the user
    const user = await User.findById(user_id);
    const isLiked = user.likes.includes(tweet_id);

    let updatedTweet, updatedUser;

    if (isLiked) {
      // Remove the like
      updatedTweet = await Tweet.findByIdAndUpdate(
        tweet_id,
        { $pull: { likes: user_id } },
        { new: true }
      );
      // console.log(updatedTweet.likes.length);

      updatedUser = await User.findByIdAndUpdate(
        user_id,
        { $pull: { likes: tweet_id } },
        { new: true }
      );

      if (!updatedTweet || !updatedUser) {
        return res.status(404).json({
          success: false,
          message: "Tweet or User not found",
        });
      }

      return res.status(200).json({
        newLength: updatedTweet.likes.length,
        success: true,
        message: "Tweet unliked successfully",
        tweet: updatedTweet,
      });
    } else {
      // Add the like
      updatedTweet = await Tweet.findByIdAndUpdate(
        tweet_id,
        { $addToSet: { likes: user_id } },
        { new: true }
      );
      // console.log(updatedTweet.likes.length);
      updatedUser = await User.findByIdAndUpdate(
        user_id,
        { $addToSet: { likes: tweet_id } },
        { new: true }
      );

      if (!updatedTweet || !updatedUser) {
        return res.status(404).json({
          success: false,
          message: "Tweet or User not found",
        });
      }

      return res.status(200).json({
        newLength: updatedTweet.likes.length,
        success: true,
        message: "Tweet liked successfully",
        tweet: updatedTweet,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to like/unlike tweet. Please try again later.",
    });
  }
};
