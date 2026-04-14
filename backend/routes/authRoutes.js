import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import authMiddleware from "../middleware/authMiddleware.js";
import multer from "multer";
import fs from "fs";
import path from "path";

const router = express.Router();


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); 
  }
});

const upload = multer({ storage });


router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const { password, ...safeUser } = user.toObject();
    res.json(safeUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.post("/register", async (req, res) => {
  try {
    const { name, email, password, branch, cgpa } = req.body;

    if (!name || !email || !password || !branch || !cgpa) {
      return res.status(400).json({ message: "All fields required" });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = new User({
      name,
      email: email.toLowerCase(),
      password,
      branch,
      cgpa
    });

    await user.save();

    res.status(201).json({ message: "User Registered Successfully" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await User.findOne({
      email: email.toLowerCase()
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    const { password: _, ...safeUser } = user.toObject();

    res.json({
      token,
      user: safeUser
    });

  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});


router.post("/google-login", async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Please register first using this email ❗"
      });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET
    );

    const { password, ...safeUser } = user.toObject();

    res.json({ token, user: safeUser });

  } catch (error) {
    console.log("GOOGLE LOGIN ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
});


router.put(
  "/profile",
  authMiddleware,
  upload.single("resume"),
  async (req, res) => {
    try {
      const user = await User.findById(req.user.id);

      const updates = { ...req.body };

     
      if (req.file && user.resume_url) {
        const oldPath = path.join("uploads", path.basename(user.resume_url));
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }

  
      if (req.file) {
        updates.resume_url = `/uploads/${req.file.filename}`;
      }

      const updatedUser = await User.findByIdAndUpdate(
        req.user.id,
        updates,
        { new: true }
      );

      const { password, ...safeUser } = updatedUser.toObject();

      res.json(safeUser);

    } catch (error) {
      console.log("UPLOAD ERROR:", error); 
      res.status(500).json({ error: error.message });
    }
  }
);

export default router;