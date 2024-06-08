// src/components/SettingPage.js
import React from 'react';
import { useEffect, useState } from 'react';
import './App.css';
import { getRandomSubset, N_OPTIONS} from '../Util';

function SettingPage({ ideas, selectedIdeas, toggleIdea, onGenerateStory }) {
  const [settings, setSettings] = useState([]);
  useEffect(() => {
    setSettings(getRandomSubset(ideas,N_OPTIONS));
  }, []);
  return (
    <div className="setting-page">
      <h2>Choose your setting...</h2>
      <div className="ideas-container">
        {settings.map((idea, index) => (
          <div
            key={index}
            className={`idea-tile ${selectedIdeas.includes(idea) ? 'selected' : ''}`}
            onClick={() => toggleIdea(idea)}
          >
            {idea}
          </div>
        ))}
      </div>
      <button onClick={onGenerateStory}>To story!</button>
    </div>
  );
}

export default SettingPage;
