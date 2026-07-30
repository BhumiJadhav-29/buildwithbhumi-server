import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

import connectDB from "./config/db.js";
import feedbackRoutes from "./routes/feedback.js";

dotenv.config();

// Connect MongoDB
connectDB();

// Gemini AI
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/feedback", feedbackRoutes);

// Home Route
app.get("/", (req, res) => {
  res.send("🚀 BuildWithBhumi AI Server is running!");
});

// Gemini Chat Route
app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const prompt = `
You are Bhumi AI Assistant.

Owner: Bhumi Jadhav

Business: BuildWithBhumi

Services:
- Website Development
- React Development
- UI/UX Design
- AI Prompt Engineering
- Portfolio Websites
- Business Websites
- Landing Pages
- E-commerce Websites

Reply professionally and briefly.

User: ${message}
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    res.json({
      reply: response.text,
    });

  } catch (error) {
    console.error("Gemini Error:", error);

    res.status(500).json({
      reply: "Sorry, I'm unable to answer right now.",
    });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
dotenv.config();

console.log("MONGO_URI =", process.env.MONGO_URI);