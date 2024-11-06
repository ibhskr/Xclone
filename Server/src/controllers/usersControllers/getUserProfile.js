import User from "../../models/User.js";
// get user profile
export const getUserProfile = async (req, res) => {
  try {
    const username = req.params.username;

    //  await User.find({ username })
    //   .select("-password")
    //   .populate("tweets comments followers following")
    //   .select("-password");

    const user = await User.findOne({ username })
      .select("-password")
      .populate({
        path: "tweets",
        options: { sort: { createdAt: -1 } },
        populate: {
          path: "author",
          select: "-password",
        },
      })
      .populate({
        path: "following followers",
        select: "username name profilePicture isVerified",
      })
      .populate({
        path: "comments",
        options: { sort: { createdAt: -1 } },
        populate: [
          {
            path: "tweet",
            populate: {
              path: "author",
              select: "username name profilePicture isVerified",
            },
          },
          {
            path: "author",
            select: "name username profilePicture isVerified",
          },
        ],
      });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve user profile. Please try again later.",
    });
  }
};
