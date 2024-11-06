import Tweet from "../../models/Tweet.js";

export const getOneTweet = async (req, res) => {
  try {
    const tweet_id = req.params.id;
    const data = await Tweet.findById(tweet_id)
      .populate({ path: "author", select: "name username" })
      .populate({
        path: "comments",
        select: "author content createdAt ",
        options: { sort: { createdAt: -1 } },
        populate: {
          path: "author",
          select: "username name isVerified",
        },
      });

    return res.status(200).json({
      success: true,
      message: "successfully get the tweet",
      data,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: "not found",
    });
  }
};
