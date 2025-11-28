import fs from "fs";
import { uploadOnCloudinary } from "../cloudConfig.js";

export const uploadImageController = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image file uploaded" });
    }

    const result = await uploadOnCloudinary(req.file.path);

    if (!result || !result.secure_url) {
      return res.status(500).json({ message: "Cloudinary upload failed" });
    }

    res.status(200).json({
      message: "Image uploaded successfully",
      image: result.secure_url,
    });
  } catch (error) {
    console.error(error);

    // Handle file too large
    if (error.code === "LIMIT_FILE_SIZE") {
      return res.status(413).json({ message: "File too large. Max 10MB." });
    }

    res.status(500).json({ message: "Upload failed", error: error.message });
  }
};
