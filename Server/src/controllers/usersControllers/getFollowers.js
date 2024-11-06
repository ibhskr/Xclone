import User from "../../models/User.js";

export const getFollwers = async (req, res) => {
  const { username } = req.params;

  try {
    const followers = await User.findOne({ username })
      .select("followers")
      .populate({
        path: "followers",
        select: "name username profilePicture isVerified",
      });
    res.status(200).json({
      success: true,
      message: "data fetched successfully",
      followers,
    });
  } catch (error) {
    res.status(403).json({
      success: false,
      message: "data fetch failed",
    });
  }
};
