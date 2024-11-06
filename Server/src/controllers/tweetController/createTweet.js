import Tweet from "../../models/Tweet.js";
import User from "../../models/User.js";
import Comment from "../../models/Comment.js";

export const createTweet = async (req, res) => {
  try {
    const { content } = req.body;
    const author = req.user.id;

    // Check if content is provided
    if (!content || content.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Content is required",
      });
    }

    // Create the tweet with content and authenticated author
    const newTweet = await Tweet.create({ content, author });

    // Add the tweet reference to the user's tweets array
    await User.findByIdAndUpdate(
      author,
      { $push: { tweets: newTweet._id } },
      { new: true }
    );

    // Respond with success
    return res.status(201).json({
      success: true,
      message: "Successfully posted.",
      tweet: newTweet,
    });
  } catch (error) {
    console.error("Error creating tweet:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to create tweet. Please try again later.",
    });
  }
};
