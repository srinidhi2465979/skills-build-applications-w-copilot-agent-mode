import dotenv from 'dotenv';

dotenv.config();

const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

export const config = {
  PORT: process.env.PORT || 8000,
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db',
  ENVIRONMENT: process.env.NODE_ENV || 'development',
  BASE_URL: baseUrl,
  CODESPACE_NAME: codespaceName || 'local',
};

export default config;
