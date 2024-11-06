// models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    isVerified: {
      type: Boolean,
      default: false,
    },
    username: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String, // URL or file path for profile picture
    },
    coverPicture: {
      type: String,
    },
    bio: {
      type: String,
      maxLength: 160,
    },
    location: {
      type: String,
      maxLength: 60,
    },
    profession: {
      type: String,
      maxLength: 60,
    },

    tweets: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tweet",
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],

    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tweet Comment",
      },
    ],
  },
  { timestamps: true } // Adds `createdAt` and `updatedAt` fields
);

export default mongoose.model("User", userSchema);
