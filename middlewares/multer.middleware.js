import multer from "multer";
import fs from "fs";

const tempDir = "./public/temp";
if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, tempDir); //  missing semicolon and comma fixed
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname);
  }
});

export const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } }); // 10MB limit
