import React, { useState, useEffect } from 'react';
import { fetchCharacters, fetchSettings, generateStory } from './api';
// import './App.css';
import StartPage from './components/StartPage';
import CharacterPage from './components/CharacterPage';
import SettingPage from './components/SettingPage';
import StoryPage from './components/StoryPage';
import LoadingSpinner from './components/LoadingSpinner';

function App() {
  const [characters, setCharacters] = useState([]);
  const [settings, setSettings] = useState([]);
  const [selectedIdeas, setSelectedIdeas] = useState([]);
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');
  const [page, setPage] = useState(0);
  const [chunks, setChunks] = useState([]);
  const [chunkImages, setChunkImages] = useState([]);
  const [currentChunk, setCurrentChunk] = useState(0);
  const [loading, setLoading] = useState(false); // Add loading state

  useEffect(() => {
    async function loadIdeas() {
      try {
        const data = await fetchCharacters();
        console.log(data); // This logs the JSON data
        setCharacters(data.characters);
      } catch (error) {
        console.error("Error fetching ideas:", error);
        setError("Failed to fetch characters. Please try again later.");
      }

      try {
        const data = await fetchSettings();
        console.log(data); // This logs the JSON data
        setSettings(data.settings);
      } catch (error) {
        console.error("Error fetching ideas:", error);
        setError("Failed to fetch settings. Please try again later.");
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
    setTitle(''); // Clear the previous title
    setLoading(true); // Set loading state to true
    setPage(4); // Navigate to the loading screen

    if (selectedIdeas.length === 0) {
      setError("Please select at least one idea.");
      setLoading(false); 
      setPage(2); // Go back to the setting page
      return;
    }

    try {
      const data = await generateStory(selectedIdeas);
      setTitle(data.title);
      setChunks(data.storyChunks); // Assuming chunks are separated by double newlines
      // get images for each chunk using jigsaw ai
      setChunkImages(data.chunkImages);
      console.log("chunkImages", data.chunkImages)
      
      setCurrentChunk(0);
      setPage(3); // Navigate to the story display page
    } catch (error) {
      console.error("Error generating story:", error);
      setError("Failed to generate story. Please try again later.");
      setPage(2); // Go back to the setting page if there's an error
    } finally {
      setLoading(false); // Set loading state to false after generating the story
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
          title={title}
          chunks={chunks}
          currentChunk={currentChunk}
          onNextChunk={handleNextChunk}
          onPreviousChunk={handlePreviousChunk}
          chunkImages={chunkImages}
        />
      )}
      {page === 4 && <LoadingSpinner />}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default App;
