// routes/tweetRoutes.js
import express from "express";
import { createTweet } from "../controllers/tweetController/createTweet.js";
import { getTweets } from "../controllers/tweetController/getTweet.js";
import { likeTweet } from "../controllers/tweetController/likeTweet.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import { getOneTweet } from "../controllers/tweetController/getOneTweet.js";
import { addComment } from "../controllers/tweetController/addComment.js";

const router = express.Router();

// POST /api/tweets - Create a new tweet
router.post("/", authMiddleware, createTweet);

// GET /api/tweets - Retrieve tweets for timeline
router.get("/", authMiddleware, getTweets);
// GET /api/tweets/:id - Retrieve one tweet for detail post
router.get("/:id", authMiddleware, getOneTweet);

// patch /api/tweets/:tweet_id/like - Like a tweet
router.patch("/:tweet_id/like", authMiddleware, likeTweet);

// POST /api/tweets/:tweet_id/unlike - dislike a tweet
// router.post("/:tweet_id/dislike", authMiddleware, dislikeTweet);

// POST /api/tweets/:tweet_id/comment - Add a comment to a tweet
router.post("/:tweet_id/comment", authMiddleware, addComment);

export default router;
