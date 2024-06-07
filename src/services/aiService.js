// src/services/aiService.js

import axios from 'axios';

const API_ENDPOINT = 'https://your-google-gemini-api-endpoint.com/v1/stories'; // Replace with the actual API endpoint

export const generateStory = async (prompt) => {
  try {
    const response = await axios.post(API_ENDPOINT, {
      prompt,
      // Include any other parameters required by the Google Gemini API
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.REACT_APP_GEMINI_API_KEY}`, // Replace with the actual header if needed
        'Content-Type': 'application/json',
      },
    });

    return response.data.story; // Adjust based on the actual response structure
  } catch (error) {
    console.error('Error generating story:', error);
    return 'An error occurred while generating the story.';
  }
};
