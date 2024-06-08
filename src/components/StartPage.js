// src/components/StartPage.js
import React from 'react';
import './App.css';

function StartPage({ onNext, ideasLoading }) {
  return (
    <div className="start-page">
      <h1>STORY TIME</h1>
      <p>Build a story with new, fun words!</p>
      <button onClick={onNext} disabled = {ideasLoading}>Start</button>
    </div>
  );
}

export default StartPage;
