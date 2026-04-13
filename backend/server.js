import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
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
app.use("/api/company", companyRoutes);

app.use("/api/auth", authRoutes);
app.use("/api/application", applicationRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/notification", notificationRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/api/query", queryRoutes);
app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({
    message: "You accessed protected route 🎉",
    user: req.user
  });
});
app.get(
  "/api/admin",
  authMiddleware,
  adminMiddleware,
  (req, res) => {
    res.json({
      message: "Welcome Admin 👑"
    });
  }
);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.get("/", (req, res) => {
  res.send("API Running...");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});