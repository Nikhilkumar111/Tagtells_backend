// backend/cloudConfig.js
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import fs from "fs";
import dotenv from "dotenv";
import { upload }  from "./middlewares/multer.middleware.js"
dotenv.config();

// ✅ Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});



console.log("Cloudinary ENV CHECK:", {
  name: process.env.CLOUD_NAME,
  key: process.env.CLOUD_API_KEY ? "✅" : "❌",
  secret: process.env.CLOUD_API_SECRET ? "✅" : "❌"
});





const uploadOnCloudinary = async (localFilePath, resourceType = "auto") => {
  try {
    if (!localFilePath) return null;

    // Upload to Cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: resourceType, // "image" or "video"
    });

    console.log("✅ Cloudinary upload success:", response.secure_url);

    // Remove local file after success
    if (fs.existsSync(localFilePath)) fs.unlinkSync(localFilePath);

    return response;
  } catch (error) {
    console.error("❌ Cloudinary upload failed:", error.message);

    // Remove local file after failure
    if (fs.existsSync(localFilePath)) fs.unlinkSync(localFilePath);

    return null;
  }
};

export { uploadOnCloudinary };






















// // ✅ Cloudinary Storage for Multer
// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: {
//     folder: "TagTells",
//     allowed_formats: ["jpg", "jpeg", "png", "webp"],
//   },
// });

// // ✅ Multer middleware
// export const upload = multer({ storage });

// // ✅ Optional manual upload utility
// export const uploadOnCloudinary = async (localFilePath, resourceType = "auto") => {
//   try {
//     if (!localFilePath) return null;

//     const response = await cloudinary.uploader.upload(localFilePath, {
//       resource_type: resourceType,
//     });

//     console.log("✅ Cloudinary upload success:", response.secure_url);

//     if (fs.existsSync(localFilePath)) fs.unlinkSync(localFilePath);

//     return response;
//   } catch (error) {
//     console.error("❌ Cloudinary upload failed:", error.message);

//     if (fs.existsSync(localFilePath)) fs.unlinkSync(localFilePath);

//     return null;
//   }
// };

// // ✅ Export Cloudinary instance too
// export { cloudinary };


