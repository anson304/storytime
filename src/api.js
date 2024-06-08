// src/api.js
import config from './config';

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
  console.log("call generate stories")
  console.log(`/api/generate-story?selectedIdeas=${encodeURIComponent(selectedIdeas.join(','))}`)
  const response = await fetch(`${config.apiUrl}/api/generate-story?selectedIdeas=${encodeURIComponent(selectedIdeas.join(','))}`);
  const data = await response.json();
  console.log("consolelog", data);
  return data;
}
