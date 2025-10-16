// // import express from "express";
// // import multer from "multer";
// import { v2 as cloudinary } from "cloudinary";
// import { CloudinaryStorage } from "multer-storage-cloudinary";



// // 🔹 Configure Cloudinary (from your .env file)
// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.CLOUD_API_KEY,
//   api_secret: process.env.CLOUD_API_SECRET,
// });



// // 🔹 Configure Multer to use Cloudinary storage
// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: {
//     folder: "Tagtells",
//     allowed_formats: ["jpg", "jpeg", "png", "webp"],
//   },

// });

// // Export the configured Cloudinary and storage objects


// // ✅ ESM export
// export { cloudinary, storage };
// // module.exports = {

// //     cloudinary,
// //     storage,
// // };