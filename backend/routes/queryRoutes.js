import express from "express";
import Query from "../models/Query.js";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";
import Notification from "../models/Notification.js";

const router = express.Router();


router.post("/add", authMiddleware, async (req, res) => {
  try {
    const { message } = req.body;

    const query = new Query({
      student: req.user.id,
      message
    });

    await query.save();

    res.json({ message: "Query submitted successfully" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/my", authMiddleware, async (req, res) => {
  try {
    const queries = await Query.find({
      student: req.user.id
    }).sort({ createdAt: -1 });

    res.json(queries);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.get("/all", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const queries = await Query.find()
      .populate("student", "name email")
      .sort({ createdAt: -1 });

    res.json(queries);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.put("/reply/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { reply } = req.body;

    const query = await Query.findByIdAndUpdate(
      req.params.id,
      {
        reply,
        status: "answered"
      },
      { new: true }
    ).populate("student");

    await Notification.create({
      user: query.student._id,
      text: `Your query has been answered`,
      type: "query"
    });

    res.json(query);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;