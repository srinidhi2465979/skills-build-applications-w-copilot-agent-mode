import express from 'express';
import mongoose from 'mongoose';

const app = express();
const PORT = 8000;
const MONGODB_URI = 'mongodb://localhost:27017/octofit-tracker';

// Middleware
app.use(express.json());

// MongoDB Connection
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

// Basic Routes
app.get('/', (req, res) => {
  res.json({ message: 'OctoFit Tracker API Server' });
});

app.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
