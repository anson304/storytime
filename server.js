const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const app = express();


require('dotenv').config();

app.use(cors()); // Enable CORS for all routes

const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GOOGLE_API_KEY);

app.get('/api/generate-ideas', async (req, res) => {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const prompt = "Generate 9 unique character types (.e.g. princess) for stories for kids. Each character type should be a single word. Single word per line. No other text other than the requested words";

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();
    const ideas = text.split('\n').filter(idea => idea.trim().length > 0);
    console.log(ideas)
    res.json({ ideas });
  } catch (error) {
    console.error("Error generating ideas:", error);
    res.status(500).send("Error generating ideas");
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
