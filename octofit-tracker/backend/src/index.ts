import express from 'express';
import config from './config';
import { connectDatabase } from './config/database';
import userRoutes from './routes/users';
import activityRoutes from './routes/activities';
import teamRoutes from './routes/teams';
import leaderboardRoutes from './routes/leaderboard';
import workoutRoutes from './routes/workouts';

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', environment: config.ENVIRONMENT });
});

// API Routes - all routes are under /api/
app.use('/api', userRoutes);
app.use('/api', activityRoutes);
app.use('/api', teamRoutes);
app.use('/api', leaderboardRoutes);
app.use('/api', workoutRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'OctoFit Tracker API Server',
    version: '1.0.0',
    baseUrl: config.BASE_URL,
    endpoints: {
      health: '/health',
      users: '/api/users',
      activities: '/api/activities',
      teams: '/api/teams',
      leaderboard: '/api/leaderboard/:period',
      workouts: '/api/workouts',
    },
  });
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err);
  res.status(500).json({ success: false, error: 'Internal server error' });
});

// Start Server
const startServer = async () => {
  try {
    // Connect to database
    await connectDatabase();

    // Start listening
    app.listen(config.PORT, () => {
      console.log(`\n✓ OctoFit Tracker API Server running on port ${config.PORT}`);
      console.log(`✓ Environment: ${config.ENVIRONMENT}`);
      console.log(`✓ Base URL: ${config.BASE_URL}`);
      console.log(`✓ MongoDB: ${config.MONGODB_URI}\n`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
