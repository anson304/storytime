import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import './App.css';

function App() {
  const [story, setStory] = useState('');
  const [error, setError] = useState('');

  async function generateStory() {
    setError(''); // Clear any previous error message
    setStory(''); // Clear the previous story
    const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = "Write a story about a magic backpack.";

    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = await response.text();
      setStory(text);
    } catch (error) {
      console.error("Error generating story:", error);
      setError("Failed to generate story. Please try again later.");
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>AI Story Generator</h1>
        <button onClick={generateStory}>Generate Story</button>
        {error && <p className="error-message">{error}</p>}
        <p>{story}</p>
      </header>
    </div>
  );
}

export default App;
