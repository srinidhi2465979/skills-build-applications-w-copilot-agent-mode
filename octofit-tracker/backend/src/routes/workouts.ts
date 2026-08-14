import express, { Request, Response } from 'express';
import { Workout } from '../models';

const router = express.Router();

// Get all workouts
router.get('/workouts', async (req: Request, res: Response) => {
  try {
    const workouts = await Workout.find()
      .populate('user', 'username email profile.firstName profile.lastName')
      .sort({ createdAt: -1 });
    res.json({ success: true, data: workouts });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch workouts' });
  }
});

// Get workouts for a user
router.get('/workouts/user/:userId', async (req: Request, res: Response) => {
  try {
    const workouts = await Workout.find({ user: req.params.userId }).sort({ createdAt: -1 });
    res.json({ success: true, data: workouts });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch workouts' });
  }
});

// Get workout by ID
router.get('/workouts/:id', async (req: Request, res: Response) => {
  try {
    const workout = await Workout.findById(req.params.id).populate(
      'user',
      'username email profile.firstName profile.lastName'
    );
    if (!workout) {
      return res.status(404).json({ success: false, error: 'Workout not found' });
    }
    res.json({ success: true, data: workout });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch workout' });
  }
});

// Create new workout
router.post('/workouts', async (req: Request, res: Response) => {
  try {
    const { user, title, description, exercises, difficulty, estimatedDuration, suggestedFor } =
      req.body;
    const workout = new Workout({
      user,
      title,
      description,
      exercises,
      difficulty,
      estimatedDuration,
      suggestedFor,
    });
    await workout.save();
    res.status(201).json({ success: true, data: workout });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
});

export default router;
