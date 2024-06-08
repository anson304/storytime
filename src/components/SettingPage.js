// src/components/SettingPage.js
import React from 'react';

function SettingPage({ ideas, selectedIdeas, toggleIdea, onGenerateStory }) {
  return (
    <div className="setting-page">
      <h2>Choose your setting...</h2>
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
      <button onClick={onGenerateStory}>To story</button>
    </div>
  );
}

export default SettingPage;
