// import path from "path";
// import express from "express";
// import multer from "multer";

// const router = express.Router();

// // ✅ Ensure uploads folder exists
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/"); // local "uploads" directory
//   },
//   filename: (req, file, cb) => {
//     const extname = path.extname(file.originalname);
//     cb(null, `${file.fieldname}-${Date.now()}${extname}`);
//   },
// });

// // ✅ File filter for images only
// const fileFilter = (req, file, cb) => {
//   const filetypes = /jpe?g|png|webp/;
//   const mimetypes = /image\/jpe?g|image\/png|image\/webp/;

//   const extname = path.extname(file.originalname).toLowerCase();
//   const mimetype = file.mimetype;

//   if (filetypes.test(extname) && mimetypes.test(mimetype)) {
//     cb(null, true);
//   } else {
//     cb(new Error("Images only"), false);
//   }
// };

// // ✅ Multer instance
// const upload = multer({ storage, fileFilter });

// // ✅ Single image upload middleware (field name must match Postman!)
// const uploadSingleImage = upload.single("images"); // <-- changed to "images"

// router.post("/", (req, res) => {
//   uploadSingleImage(req, res, (err) => {
//     if (err) {
//       return res.status(400).json({ message: err.message });
//     }
//     if (!req.file) {
//       return res.status(400).json({ message: "No image file provided" });
//     }

//     res.status(200).json({
//       message: "Image uploaded successfully",
//       image: `/${req.file.path}`, // path to uploaded file
//     });
//   });
// });

// export default router;



import path from "path";
import fs from "fs";
import express from "express";
import multer from "multer";

const router = express.Router();

// Ensure uploads/ folder exists
const uploadDir = path.resolve("uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}


// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const extname = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${Date.now()}${extname}`);
  },
});

// File filter for images only
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed (.jpg, .png, .webp)"), false);
  }
};

const upload = multer({ storage, fileFilter });
const uploadSingleImage = upload.single("image");

// Upload Route
router.post("/", (req, res) => {
  uploadSingleImage(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ message: "No image file provided" });
    }

    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

    res.status(200).json({
      message: "Image uploaded successfully",
      image: imageUrl,
    });
  });
});

export default router;

