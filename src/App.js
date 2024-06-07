import React, { useState, useEffect } from 'react';
import { fetchIdeas, generateStory } from './api';
import './App.css';

function App() {
  const [ideas, setIdeas] = useState([]);
  const [selectedIdeas, setSelectedIdeas] = useState([]);
  const [story, setStory] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadIdeas() {
      try {
        const data = await fetchIdeas();
        console.log(data); // This logs the JSON data
        setIdeas(data.ideas);
      } catch (error) {
        console.error("Error fetching ideas:", error);
        setError("Failed to fetch story ideas. Please try again later.");
      }
    }

    loadIdeas();
  }, []);

  function toggleIdea(idea) {
    setSelectedIdeas(prevSelected => {
      if (prevSelected.includes(idea)) {
        return prevSelected.filter(i => i !== idea);
      } else {
        return [...prevSelected, idea];
      }
    });
  }

  async function handleGenerateStory() {
    setError(''); // Clear any previous error message
    setStory(''); // Clear the previous story

    try {
      const text = await generateStory(selectedIdeas);
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
        <div className="ideas-container">
          {ideas.map((idea, index) => (
            <div
              key={index}
              className={`idea-tile ${selectedIdeas.includes(idea) ? 'selected' : ''}`}
              onClick={() => toggleIdea(idea)}
            >
              {idea}
            </div>
          ))}
        </div>
        <button onClick={handleGenerateStory}>Generate Story</button>
        {error && <p className="error-message">{error}</p>}
        <p>{story}</p>
      </header>
    </div>
  );
}

export default App;
