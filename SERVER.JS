-import "dotenv/config";
import express from "express";
import { GoogleGenAI } from "@google/genai";

const app = express();

app.use(express.json());
app.use(express.static("public"));

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

app.post("/api/chat", async (req, res) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-flash-latest",
      contents: req.body.message
    });

    res.json({ answer: response.text });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "AI উত্তর দিতে পারেনি" });
  }
});


  
const PORT = process.env.PORT || 3000
app.listen(PORT, "0.0.0.0", () => {
  console.log("INDIAN AI Server is running");
});
