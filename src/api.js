// src/api.js
import config from './config';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function fetchCharacters() {
  const response = await fetch(`${config.apiUrl}/api/generate-characters`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}

export async function fetchSettings() {
  const response = await fetch(`${config.apiUrl}/api/generate-settings`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}

export async function generateStory(selectedIdeas) {
  const genAI = new GoogleGenerativeAI(config.googleApiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const prompt = `Write a story incorporating the following ideas: ${selectedIdeas.join(', ')}`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}
