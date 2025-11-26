// // controllers/uploadController.js
// import { uploadOnCloudinary } from "../cloudConfig.js";

// export const uploadImageController = async (req, res) => {
//   try {
//     // Check if multer uploaded a file
//     if (!req.file) {
//       return res.status(400).json({ message: "No file uploaded" });
//     }

//     // Upload that file to Cloudinary
//     const result = await uploadOnCloudinary(req.file.path);

//     if (!result) {
//       return res.status(500).json({ message: "Upload to Cloudinary failed" });
//     }

//     // Respond with image URL
//     res.status(200).json({
//       message: "Image uploaded successfully",
//       image: result.secure_url,
//     });
//   } catch (error) {
//     console.error("Upload error:", error);
//     res.status(500).json({ message: error.message });
//   }
// };



import fs from "fs";
import { uploadOnCloudinary } from "../cloudConfig.js"; // your helper

export const uploadImageController = async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: "No image file uploaded" });
    }

    const result = await uploadOnCloudinary(file.path);
    if (fs.existsSync(file.path)) fs.unlinkSync(file.path);

    if (!result || !result.secure_url) {
      return res.status(500).json({ message: "Cloudinary upload failed" });
    }

    res.status(200).json({
      message: "Image uploaded successfully",
      image: result.secure_url,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Upload failed", error: error.message });
  }
};
