import User from "../../models/User.js";

export const getLoginUserDetails = async (req, res) => {
  try {
    const userId = req.user.id;
    // console.log(userId);
    const user = await User.findById(userId).select("-password");
    return res.status(200).json({
      success: true,
      message: "fetch user details sucessfully",
      user,
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "unable fetch user details.",
    });
  }
};
