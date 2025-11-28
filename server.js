// packages
import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

// utils
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Connect to DB
connectDB();

//  CORS setup for Render + Vercel frontend
const allowedOrigins = [
  "http://localhost:5173",
  "https://tagtells-frontend.vercel.app"   // added for deployment
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Body parser
app.use(express.json({ limit: "50mb" })); //  fix 413 upload error
app.use(express.urlencoded({ extended: true, limit: "50mb" })); //  fix 413
app.use(cookieParser());

// Test route
app.get("/", (req, res) => {
  res.send("Hello from TagTells API 🚀");
});

// Routes
app.use("/api/users", userRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/orders", orderRoutes);

// Uploads folder
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ⭐ Global error handler (fixes Unexpected '<' JSON parse error)
app.use((err, req, res, next) => {
  const status = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(status).json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
});

// Start server
app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
