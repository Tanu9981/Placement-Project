import express from "express";
import Company from "../models/Company.js";
import Notification from "../models/Notification.js";
import Application from "../models/Application.js";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();


router.post("/add", authMiddleware, adminMiddleware, async (req, res) => {
  try {

    console.log("BODY RECEIVED:", req.body); 

    const {
      name,
      role,
      package: pkg,
      location,
      eligibility
    } = req.body;

 
    if (!name || !role || !pkg || !location) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (!eligibility || !eligibility.minCGPA) {
      return res.status(400).json({ error: "Eligibility required" });
    }

    if (
      !eligibility.branches ||
      !Array.isArray(eligibility.branches) ||
      eligibility.branches.length === 0
    ) {
      return res.status(400).json({ error: "Select at least one branch" });
    }

  
    const company = new Company({
      name,
      role,
      package: Number(pkg), 
      location,
      eligibility: {
        minCGPA: Number(eligibility.minCGPA),
        branches: eligibility.branches
      }
    });

    await company.save();

 
    await Notification.create({
      text: `${company.name} drive is now open 🚀 Apply soon!`,
      type: "drive",
      company: company._id
    });

    res.status(201).json({
      message: "Company Added Successfully",
      company
    });

  } catch (error) {
    console.log("ADD COMPANY ERROR:", error); 
    res.status(500).json({ error: error.message });
  }
});



router.get("/", authMiddleware, async (req, res) => {
  try {

    const companies = await Company.find();

    const companiesWithStats = await Promise.all(
      companies.map(async (c) => {

        const appliedCount = await Application.countDocuments({
          company: c._id
        });

      
        const placedStudents = await Application.distinct("student", {
          company: c._id,
          status: "selected"
        });

        const placedCount = placedStudents.length;

        return {
          ...c.toObject(),
          appliedCount,
          placedCount
        };
      })
    );

    res.json(companiesWithStats);

  } catch (error) {
    console.log("GET COMPANIES ERROR:", error);
    res.status(500).json({ error: error.message });
  }
});

export default router;