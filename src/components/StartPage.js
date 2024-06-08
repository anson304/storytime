// src/components/StartPage.js
import React from 'react';

function StartPage({ onNext }) {
  return (
    <div className="start-page">
      <h1>STORY TIME</h1>
      <p>Build a story with new, fun words!</p>
      <button onClick={onNext}>Start</button>
    </div>
  );
}

export default StartPage;
