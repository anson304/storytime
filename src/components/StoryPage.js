// src/components/StoryPage.js
import React from 'react';
import './App.css';

function StoryPage({ title, chunks, currentChunk, onNextChunk, onPreviousChunk }) {
  return (
    <div className="story-page">
      <h2>{title}</h2>
      <div className="story-chunk">
        {chunks[currentChunk]}
      </div>
      <div className="story-navigation">
        <button onClick={onPreviousChunk} disabled={currentChunk === 0}>←</button>
        <button onClick={onNextChunk} disabled={currentChunk === chunks.length - 1}>→</button>
      </div>
    </div>
  );
}

export default StoryPage;
