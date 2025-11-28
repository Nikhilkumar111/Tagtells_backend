
import express from "express";
import { upload } from "../middlewares/multer.middleware.js"; // ✅ Named import
import { uploadImageController } from "../controllers/uploadController.js";

const router = express.Router();

router
  .route("/").post(upload.single("image"), uploadImageController);

export default router;










