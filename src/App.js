import React, { useState, useEffect } from 'react';
import { generateStory } from './api';
// import './App.css';
import StartPage from './components/StartPage';
import CharacterPage from './components/CharacterPage';
import SettingPage from './components/SettingPage';
import StoryPage from './components/StoryPage';
import LoadingSpinner from './components/LoadingSpinner';


function getRandomSubset(arr, n) {
  // Shuffle array using Fisher-Yates algorithm
  const shuffled = arr.sort(() => 0.5 - Math.random());

  // Get subset of `n` elements
  return shuffled.slice(0, n);
}

const N_OPTIONS = 9;

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
  const [loading, setLoading] = useState(true); // Add loading state
  const [ideasLoading, setIdeasLoading] = useState(true); // Add loading state

  useEffect(() => {
    async function loadIdeas() {
      setIdeasLoading(true); // Set loading state to true
      // try {
      //   const data = await fetchCharacters();
      //   console.log(data); // This logs the JSON data
      //   setCharacters(data.characters);
      // } catch (error) {
      //   console.error("Error fetching ideas:", error);
      //   setError("Failed to fetch characters. Please try again later.");
      // }
      fetch('/characters.json')
      .then(response => response.json())
      .then(json => {
        setCharacters(getRandomSubset(json.characters,N_OPTIONS));
        console.log("characters", json.characters); // Log inside the `then` block
      })
      .catch(error => {
        console.error('Error fetching characters:', error);
        // Handle error state if needed
      })
      // try {
      //   const data = await fetchSettings();
      //   console.log(data); // This logs the JSON data
      //   setSettings(data.settings);
      // } catch (error) {
      //   console.error("Error fetching ideas:", error);
      //   setError("Failed to fetch settings. Please try again later.");
      // }
      fetch('/settings.json')
      .then(response => response.json())
      .then(json => {
        setSettings(getRandomSubset(json.settings,N_OPTIONS));
        console.log("settings", json.settings); // Log inside the `then` block
      })
      .catch(error => {
        console.error('Error fetching settings:', error);
        // Handle error state if needed
      })

      setIdeasLoading(false); // Set loading state to false after fetching the ideas
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
      {page === 0 && <StartPage onNext={() => setPage(1)} ideasLoading={ideasLoading} />}
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
      <div className="jigsaw-badge">
        <a href="https://jigsawstack.com/?ref=powered-by" rel="follow">
        <img
          src="https://jigsawstack.com/badge.svg"
          alt="Powered by JigsawStack. The One API for your next big thing."
          width={150}
        />
        </a>
      </div>
    </div>
  );
}

export default App;
