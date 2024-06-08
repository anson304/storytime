const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const app = express();

const { Buffer } = require("buffer");

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

app.get('/api/generate-story', async (req, res) => {
  const endpoint = "https://api.jigsawstack.com/v1/ai/image_generation";
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  try {
    const selectedIdeas = req.query.selectedIdeas ? req.query.selectedIdeas.split(',') : [];
    
    if (!selectedIdeas.length) {
      console.error("No ideas provided");
      return res.status(400).send("No ideas provided");
    }

    const prompt = `Generate a title and a story for kids based on these ideas: ${selectedIdeas.join(', ')}`
    + ` The title should be short and captivating. Remove markdown formatting.` 
    + ` The story should be broken into digestible chunks, with each chunk containing a main idea.`
    + ` Return the title on the first line and the story in the following lines`
    + ` For each chunk, generate a prompt for a text to image AI`
    + ` return the result in json format, use key 'title' for the title, 'storyChunks' for a list of story chunks and 'chunkImagePrompts' for a list of image prompts of the chunks.`
    + ` return only the json result. no additional text.`;
    console.log("Generated Prompt:", prompt);

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();
    const textJson = JSON.parse(text);
    console.log(textJson);

    // storyChunks = storyChunks.slice(0, 2);
    
    // Prepare fetch requests for each story chunk
   // Prepare fetch requests for each story chunk
   const fetchPromises = textJson.chunkImagePrompts.map(chunkImagePrompt => {
    console.log("fetching chunk: ", chunkImagePrompt.slice(0, 20));
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.JIGSAW_API_KEY,
      },
      body: JSON.stringify({
        prompt: chunkImagePrompt + " cartoonish style. bright colours.",
        size: "small",
        model: "dalle",
      }),
    };

    return fetch(endpoint, options)
      .then(response => response.arrayBuffer())
      .then(arrayBuffer => {
        const buffer = Buffer.from(arrayBuffer);
        return `data:image/png;base64,${buffer.toString('base64')}`;
      });
  });

    // Await all fetch promises concurrently
    const chunkImages = await Promise.all(fetchPromises);
    console.log("finished story");
    res.json({ title: textJson.title, storyChunks: textJson.storyChunks, chunkImages });

  } catch (error) {
    console.error("Error generating story:", error);
    res.status(500).send("Error generating story");
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
