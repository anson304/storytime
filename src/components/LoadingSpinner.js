// src/components/LoadingSpinner.js
import React from 'react';
import './App.css';

function LoadingSpinner() {
  return (
    <div className="loading-spinner">
      <div className="spinner"></div>
      <p>Brewing up goodness...</p>
    </div>
  );
}

export default LoadingSpinner;
