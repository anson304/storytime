import React from 'react';
import './App.css';

function StoryPage({ title, chunks, currentChunk, onNextChunk, onPreviousChunk, chunkImages, onRestart }) {
  const currentImageUrl = chunkImages[currentChunk];

  return (
    <div className="story-page">
      <h2>{title}</h2>
      <div className="story-content">
        <div className="story-navigation">
          <button onClick={onPreviousChunk} disabled={currentChunk === 0}>←</button>
          {(currentImageUrl && currentChunk < chunks.length - 1) && (
            <div className="story-image">
              <img src={currentImageUrl} alt={`Chunk ${currentChunk}`} />
            </div>
          )}
          {currentChunk < chunks.length - 1 && (
            <button onClick={onNextChunk}>→</button>
          )}
        </div>
        <div className="story-chunk">
          <p>{chunks[currentChunk]}</p>
        </div>
          {currentChunk === chunks.length - 1 && (
            <button className="restart-button" onClick={onRestart}>Begin next story!</button>
          )}
      </div>
    </div>
  );
}


export default StoryPage;
