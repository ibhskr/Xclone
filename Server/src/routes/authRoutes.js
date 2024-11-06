// routes/authRoutes.js
import express from "express";
import { register } from "../controllers/authController/register.js";
import { login } from "../controllers/authController/login.js";
import { logout } from "../controllers/authController/logout.js";
import { getLoginUserDetails } from "../controllers/authController/getLoginUserDetails.js";
import authMiddleware from "../middlewares/authMiddleware.js";
const router = express.Router();

// POST /api/auth/register - Register a new user
router.post("/register", register);

// POST /api/auth/login - Login a user
router.post("/login", login);

// POST /api/auth/logout - Logout a user
router.post("/logout", logout);
// GET /api/auth/ - Login user details
router.get("/", authMiddleware, getLoginUserDetails);
export default router;
