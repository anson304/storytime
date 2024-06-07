// src/components/StoryGenerator.js

import React, { useState } from 'react';
import { generateStory } from '../services/aiService';

const StoryGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [story, setStory] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerateStory = async () => {
    setLoading(true);
    const generatedStory = await generateStory(prompt);
    setStory(generatedStory);
    setLoading(false);
  };

  return (
    <div>
      <h1>Storytelling AI</h1>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your story prompt..."
      />
      <button onClick={handleGenerateStory} disabled={loading}>
        {loading ? 'Generating...' : 'Generate Story'}
      </button>
      {story && (
        <div>
          <h2>Generated Story</h2>
          <p>{story}</p>
        </div>
      )}
    </div>
  );
};

export default StoryGenerator;
