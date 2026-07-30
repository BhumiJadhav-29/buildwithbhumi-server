import express from "express";
import Feedback from "../models/Feedback.js";

const router = express.Router();

// Save Feedback
router.post("/", async (req, res) => {
  try {
    const feedback = await Feedback.create(req.body);
    res.status(201).json(feedback);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Get All Approved Feedback
router.get("/", async (req, res) => {
  try {
    const feedback = await Feedback.find({
      approved: true,
    }).sort({
      createdAt: -1,
    });

    res.json(feedback);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

export default router;