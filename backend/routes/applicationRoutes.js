import express from "express";
import Application from "../models/Application.js";
import Company from "../models/Company.js";
import User from "../models/User.js";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";
import Notification from "../models/Notification.js";

const router = express.Router();


router.post("/apply/:companyId", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId);
    const company = await Company.findById(req.params.companyId);

    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    if (!user.resume_url) {
      return res.status(400).json({
        message: "Please upload resume in profile first"
      });
    }

  
    if (
      user.cgpa < company.eligibility.minCGPA ||
      !company.eligibility.branches.includes(user.branch)
    ) {
      return res.status(400).json({ message: "Not eligible" });
    }

   
    const alreadyApplied = await Application.findOne({
      student: userId,
      company: company._id
    });

    if (alreadyApplied) {
      return res.status(400).json({ message: "Already applied" });
    }

   
    const application = new Application({
      student: userId,
      company: company._id,
      resume: user.resume_url 
    });

    await application.save();

    res.json({ message: "Applied successfully" });

  } catch (error) {
    console.log("APPLY ERROR:", error); 
    res.status(500).json({ error: error.message });
  }
});


router.get("/my", authMiddleware, async (req, res) => {
  try {
    const applications = await Application.find({
      student: req.user.id
    }).populate("company");

    res.json(applications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.get("/all", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const applications = await Application.find()
      .populate("student")
      .populate("company");

    res.json(applications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.put("/status/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { status } = req.body;

    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate("company").populate("student");

    
    if (status === "selected") {
      await Notification.create({
        user: application.student._id,
        text: `🎉 Congratulations! You are selected in ${application.company.name}`,
        type: "result",
        company: application.company._id
      });
    }

    res.json(application);

  } catch (error) {
    console.log("STATUS UPDATE ERROR:", error);
    res.status(500).json({ error: error.message });
  }
});


router.get("/placed", authMiddleware, async (req, res) => {
  try {
    const placements = await Application.find({
      status: "selected"
    })
      .populate("student", "name email branch")
      .populate("company", "name role package");

    res.json(placements);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;