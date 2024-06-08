// src/components/CharacterPage.js
import React, { useEffect, useState } from 'react';
import './App.css';
import { getRandomSubset, N_OPTIONS} from '../Util';

function CharacterPage({ ideas, selectedIdeas, toggleIdea, onNext }) {
  const [characters, setCharacters] = useState([]);
  useEffect(() => {
    setCharacters(getRandomSubset(ideas,N_OPTIONS));
  }, []);
  return (
    <div className="character-page">
      <h2>Choose your character...</h2>
      <div className="ideas-container">
        {characters.map((idea, index) => (
          <div
            key={index}
            className={`idea-tile ${selectedIdeas.includes(idea) ? 'selected' : ''}`}
            onClick={() => toggleIdea(idea)}
          >
            {idea}
          </div>
        ))}
      </div>
      <button onClick={onNext}>Next</button>
    </div>
  );
}

export default CharacterPage;
