// process.loadEnvFile();

import dotenv from "dotenv";
dotenv.config();
export const port = process.env.PORT;
export const dbURI = process.env.MONGO_URI;
export const secret = process.env.JWT_SECRET;
