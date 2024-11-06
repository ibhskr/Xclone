import express from "express";
import { port } from "./src/config/env.js";
import authRoutes from "./src/routes/authRoutes.js";
import tweetRoutes from "./src/routes/tweetRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import mediaRoute from "./src/routes/mediaRoutes.js";
import connectDB from "./src/config/db.js";
const app = express();
//
//
app.use(express.json());
// database connection
connectDB();
// Routes
app.use("/api/auth", authRoutes); // Authentication routes
app.use("/api/tweets", tweetRoutes); // Tweet-related routes
app.use("/api/users", userRoutes); // User-related routes
app.use("/api/media", mediaRoute); // media-related routes

//--
const PORT = port || 3000;
app.listen(PORT, () => {
  console.log("server is running on PORT: " + PORT);
});
