import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

import authRoutes from "./routes/authRoutes.js";
import authMiddleware from "./middleware/authMiddleware.js";
import adminMiddleware from "./middleware/adminMiddleware.js";
import companyRoutes from "./routes/companyRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import queryRoutes from "./routes/queryRoutes.js";

dotenv.config();

const app = express();


app.use(cors({
  origin: "*"
}));

app.use(express.json());

const uploadPath = "uploads";
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
}


app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));


app.use("/api/auth", authRoutes);
app.use("/api/company", companyRoutes);
app.use("/api/application", applicationRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/notification", notificationRoutes);
app.use("/api/query", queryRoutes);


app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({
    message: "You accessed protected route 🎉",
    user: req.user
  });
});

app.get("/api/admin", authMiddleware, adminMiddleware, (req, res) => {
  res.json({
    message: "Welcome Admin 👑"
  });
});


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.get("/", (req, res) => {
  res.send("API Running...");
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});