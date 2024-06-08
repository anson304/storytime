// src/components/StartPage.js
import React from 'react';
import './App.css';

function StartPage({ onNext, ideasLoading }) {
  return (
    <div className="start-page">
      <h1 className="start-page-title">STORY TIME</h1>
      <p className="start-page-description">Build a story with fun and new words!</p>
      <button onClick={onNext} disabled = {ideasLoading}>Start</button>
    </div>
  );
}

export default StartPage;
