import React, { useState, useEffect } from 'react';
import { fetchCharacters, fetchSettings, generateStory } from './api';
import './App.css';
import StartPage from './components/StartPage';
import CharacterPage from './components/CharacterPage';
import SettingPage from './components/SettingPage';
import StoryPage from './components/StoryPage';

function App() {
  const [characters, setCharacters] = useState([]);
  const [settings, setSettings] = useState([]);
  const [selectedIdeas, setSelectedIdeas] = useState([]);
  const [story, setStory] = useState('');
  const [error, setError] = useState('');
  const [page, setPage] = useState(0);
  const [chunks, setChunks] = useState([]);
  const [currentChunk, setCurrentChunk] = useState(0);

  useEffect(() => {
    async function loadIdeas() {
      try {
        const data = await fetchCharacters();
        console.log(data); // This logs the JSON data
        setCharacters(data.characters);
      } catch (error) {
        console.error("Error fetching ideas:", error);
        setError("Failed to fetch story ideas. Please try again later.");
      }

      try {
        const data = await fetchSettings();
        console.log(data); // This logs the JSON data
        setSettings(data.settings);
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

    if (selectedIdeas.length === 0) {
      setError("Please select at least one idea.");
      return;
    }

    try {
      const text = await generateStory(selectedIdeas);
      setStory(text);
      setChunks(text.split('\n\n')); // Assuming chunks are separated by double newlines
      setCurrentChunk(0);
      setPage(3); // Navigate to the story display page
    } catch (error) {
      console.error("Error generating story:", error);
      setError("Failed to generate story. Please try again later.");
    }
  }

  function handleNextChunk() {
    if (currentChunk < chunks.length - 1) {
      setCurrentChunk(currentChunk + 1);
    }
  }

  function handlePreviousChunk() {
    if (currentChunk > 0) {
      setCurrentChunk(currentChunk - 1);
    }
  }

  return (
    <div className="App">
      {page === 0 && <StartPage onNext={() => setPage(1)} />}
      {page === 1 && (
        <CharacterPage
          ideas={characters}
          selectedIdeas={selectedIdeas}
          toggleIdea={toggleIdea}
          onNext={() => setPage(2)}
        />
      )}
      {page === 2 && (
        <SettingPage
          ideas={settings}
          selectedIdeas={selectedIdeas}
          toggleIdea={toggleIdea}
          onGenerateStory={handleGenerateStory}
        />
      )}
      {page === 3 && (
        <StoryPage
          chunks={chunks}
          currentChunk={currentChunk}
          onNextChunk={handleNextChunk}
          onPreviousChunk={handlePreviousChunk}
        />
      )}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default App;
