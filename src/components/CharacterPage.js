// src/components/CharacterPage.js
import React from 'react';
import './App.css';

function CharacterPage({ ideas, selectedIdeas, toggleIdea, onNext }) {
  return (
    <div className="character-page">
      <h2>Choose your character...</h2>
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
      <button onClick={onNext}>Next</button>
    </div>
  );
}

export default CharacterPage;
