import User from "../../models/User.js";
export const getFollwing = async (req, res) => {
  const { username } = req.params;

  try {
    const following = await User.findOne({ username })
      .select("following")
      .populate({
        path: "following",
        select: "name username profilePicture isVerified",
      });
    res.status(200).json({
      success: true,
      message: "data fetched successfully",
      following,
    });
  } catch (error) {
    res.status(403).json({
      success: false,
      message: "data fetch failed",
    });
  }
};
