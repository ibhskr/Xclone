import User from "../../models/User.js";

export const searchUser = async (req, res) => {
  try {
    const name = req.query.name || "random";
    if (name == "random") {
      const users = await User.find().limit(10);
      return res.status(200).json({
        success: true,
        message: "successfully fetch users",
        users,
      });
    } else {
      const users = await User.find({ name }).limit(10);
      return res.status(200).json({
        success: true,
        message: "successfully fetch users",
        users,
      });
    }
  } catch (error) {
    return req.status(403).json({
      success: false,
      message: "internal server error",
    });
  }
};
