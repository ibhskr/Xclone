// Multer Middleware Setup (cloudinaryConfig.js)
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
process.loadEnvFile();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "xClone", // Upload to a specific Cloudinary folder
    format: "jpg", // Set file format (e.g., jpg, png)
    public_id: (req, file) => `${uuidv4()}-${file.originalname}`, // Unique filename
  },
});

export const upload = multer({ storage });
