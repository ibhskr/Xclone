import Tweet from "../../models/Tweet.js";
import User from "../../models/User.js";
import Comment from "../../models/Comment.js";

export const addComment = async (req, res) => {
  try {
    const { tweet_id } = req.params;
    const { content } = req.body;
    const user_id = req.user.id;

    // console.table([tweet_id, content, user_id]);
    // Check if content and tweet_id are provided
    if (!content || !tweet_id || !user_id) {
      return res.status(400).json({
        success: false,
        message: "Content and tweet ID are required",
      });
    }

    // Create a new comment
    const newComment = await Comment.create({
      content,
      author: user_id,
      tweet: tweet_id,
    });

    // Add the comment to the tweet's comments array
    await Tweet.findByIdAndUpdate(
      tweet_id,
      { $push: { comments: newComment._id } },
      { new: true }
    );

    //  add the comment to the user's comments array
    await User.findByIdAndUpdate(
      user_id,
      { $push: { comments: newComment._id } },
      { new: true }
    );

    return res.status(201).json({
      success: true,
      message: "Comment added successfully",
      comment: newComment,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to add comment. Please try again later.",
    });
  }
};
