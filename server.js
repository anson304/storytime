const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const app = express();


require('dotenv').config();

app.use(cors()); // Enable CORS for all routes

const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GOOGLE_API_KEY);

app.get('/api/generate-characters', async (req, res) => {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const prompt = "Generate 9 unique character types (.e.g. princess) for stories for kids. Each character type should be a single word. Single word per line. No other text other than the requested words";

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();
    const characters = text.split('\n').filter(idea => idea.trim().length > 0);
    console.log(characters)
    res.json({ characters });
  } catch (error) {
    console.error("Error generating characters:", error);
    res.status(500).send("Error generating characters");
  }
});

app.get('/api/generate-settings', async (req, res) => {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const prompt = "Generate 9 unique settings (.e.g. castle) for stories for kids. Each setting should be a single word. Single word per line. No other text other than the requested words";

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();
    const settings = text.split('\n').filter(idea => idea.trim().length > 0);
    console.log(settings)
    res.json({ settings });
  } catch (error) {
    console.error("Error generating settings:", error);
    res.status(500).send("Error generating settings");
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
