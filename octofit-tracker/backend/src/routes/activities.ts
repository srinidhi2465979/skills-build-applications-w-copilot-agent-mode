import express, { Request, Response } from 'express';
import { Activity } from '../models';

const router = express.Router();

// Get all activities
router.get('/activities', async (req: Request, res: Response) => {
  try {
    const activities = await Activity.find()
      .populate('user', 'username email profile.firstName profile.lastName')
      .sort({ date: -1 });
    res.json({ success: true, data: activities });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch activities' });
  }
});

// Get activities for a user
router.get('/activities/user/:userId', async (req: Request, res: Response) => {
  try {
    const activities = await Activity.find({ user: req.params.userId }).sort({ date: -1 });
    res.json({ success: true, data: activities });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch activities' });
  }
});

// Create new activity
router.post('/activities', async (req: Request, res: Response) => {
  try {
    const { user, type, duration, distance, calories, date, notes } = req.body;
    const activity = new Activity({
      user,
      type,
      duration,
      distance,
      calories,
      date,
      notes,
    });
    await activity.save();
    res.status(201).json({ success: true, data: activity });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
});

export default router;
