import express from "express";
import User from "../models/User.js";
import Company from "../models/Company.js";
import Application from "../models/Application.js";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get("/stats", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const totalStudents = await User.countDocuments({ role: "student" });
    const totalCompanies = await Company.countDocuments();
    const totalPlaced = await Application.countDocuments({ status: "selected" });

    res.json({
      totalStudents,
      totalCompanies,
      totalPlaced
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;