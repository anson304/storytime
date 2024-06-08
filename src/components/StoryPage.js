import React from 'react';
import './App.css';

function StoryPage({ title, chunks, currentChunk, onNextChunk, onPreviousChunk, chunkImages }) {
  const currentImageUrl = chunkImages[currentChunk];

  return (
    <div className="story-page">
      <h2>{title}</h2>
      <div className="story-content">
        <div className="story-chunk">
          <p>{chunks[currentChunk]}</p>
        </div>
        {currentImageUrl && (
          <div className="story-image">
            <img src={currentImageUrl} alt={`Chunk ${currentChunk}`}/>
          </div>
        )}
        <div className="story-navigation">
          <button onClick={onPreviousChunk} disabled={currentChunk === 0}>←</button>
          <button onClick={onNextChunk} disabled={currentChunk === chunks.length - 1}>→</button>
        </div>
      </div>
    </div>
  );
}

export default StoryPage;
