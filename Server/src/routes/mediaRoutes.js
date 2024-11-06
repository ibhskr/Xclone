import express from "express";
const router = express.Router();
import { upload } from "../config/cloudinaryConfig.js";
import { profilePicture } from "../controllers/mediaController/profilePicture.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import { coverPicture } from "../controllers/mediaController/coverPicture.js";

// POST - /api/media/profile-picture
router.post(
  "/profile-picture",
  authMiddleware,
  upload.single("myfile"),
  profilePicture
);
// POST - /api/media/cover-picture
router.post(
  "/cover-picture",
  authMiddleware,
  upload.single("myfile"),
  coverPicture
);

export default router;
