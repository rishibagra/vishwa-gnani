import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import dotenv from 'dotenv';

dotenv.config();

// Configure Cloudinary with environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Use memory storage to hold files temporarily in buffer
const storage = multer.memoryStorage();
export const upload = multer({ storage: storage });

// Helper function to stream buffer directly to Cloudinary
export const uploadToCloudinary = (buffer, folderName = 'vishwa-gnani-uploads') => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: folderName, resource_type: 'auto' },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    uploadStream.end(buffer);
  });
};

export { cloudinary };