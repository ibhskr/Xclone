import mongoose from "mongoose";
import { dbURI } from "./env.js";
const connectDB = async () => {
  try {
    await mongoose.connect(dbURI);
    console.log("Database connected sucessfully.");
  } catch (error) {
    console.log("Database connection failed.");
  }
};
export default connectDB;
