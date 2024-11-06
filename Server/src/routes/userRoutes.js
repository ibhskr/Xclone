// routes/userRoutes.js
import express from "express";

import authMiddleware from "../middlewares/authMiddleware.js";
import { getFollwers } from "../controllers/usersControllers/getFollowers.js";
import { getFollwing } from "../controllers/usersControllers/getFollowing.js";
import { searchUser } from "../controllers/usersControllers/findUser.js";
import { getUserProfile } from "../controllers/usersControllers/getUserProfile.js";
import { followUser } from "../controllers/usersControllers/followUser.js";
import { unfollowUser } from "../controllers/usersControllers/unfollowUser.js";
import { updateUserProfile } from "../controllers/usersControllers/updateUserProfile.js";

const router = express.Router();

// GET /api/users/ - Get user profile
router.get("/", authMiddleware, searchUser);

// GET /api/users/:username - Get user profile
router.get("/:username", authMiddleware, getUserProfile);

// GET /api/users/:username/follower
router.get("/:username/followers", authMiddleware, getFollwers);
// GET /api/users/:username/following
router.get("/:username/following", authMiddleware, getFollwing);

// POST /api/users/:id/follow - Follow a user
router.post("/:id/follow", authMiddleware, followUser);

// POST /api/users/:id/unfollow - Unfollow a user
router.post("/:id/unfollow", authMiddleware, unfollowUser);

// PATCH /api/users/update - Update user profile
router.patch("/update", authMiddleware, updateUserProfile);

export default router;
