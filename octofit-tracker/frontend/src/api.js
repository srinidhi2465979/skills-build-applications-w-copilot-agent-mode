/**
 * API Configuration for OctoFit Tracker Frontend
 * 
 * Requires VITE_CODESPACE_NAME to be set in .env.local:
 * VITE_CODESPACE_NAME=your-codespace-name
 */

const getApiBaseUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  
  if (codespaceName && codespaceName !== 'undefined') {
    return `https://${codespaceName}-8000.app.github.dev/api`;
  }
  
  // Fallback to localhost for local development
  console.warn(
    'VITE_CODESPACE_NAME not set. Using localhost fallback. ' +
    'For Codespaces, add VITE_CODESPACE_NAME to .env.local'
  );
  return 'http://localhost:8000/api';
};

export const API_BASE_URL = getApiBaseUrl();

export const apiEndpoints = {
  users: `${API_BASE_URL}/users`,
  activities: `${API_BASE_URL}/activities`,
  teams: `${API_BASE_URL}/teams`,
  leaderboard: (period) => `${API_BASE_URL}/leaderboard/${period}`,
  workouts: `${API_BASE_URL}/workouts`,
};

export const fetchApi = async (url, options = {}) => {
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API Fetch Error:', error);
    throw error;
  }
};
