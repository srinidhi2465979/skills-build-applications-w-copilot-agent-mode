import express, { Request, Response } from 'express';
import { Leaderboard } from '../models';

const router = express.Router();

// Get leaderboard by period
router.get('/leaderboard/:period', async (req: Request, res: Response) => {
  try {
    const { period } = req.params;
    if (!['weekly', 'monthly', 'allTime'].includes(period)) {
      return res.status(400).json({ success: false, error: 'Invalid period' });
    }

    const leaderboard = await Leaderboard.find({ period })
      .populate('user', 'username email profile.firstName profile.lastName')
      .sort({ ranking: 1 });

    res.json({ success: true, data: leaderboard });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch leaderboard' });
  }
});

// Get user ranking
router.get('/leaderboard/:period/:userId', async (req: Request, res: Response) => {
  try {
    const { period, userId } = req.params;
    const userRanking = await Leaderboard.findOne({ period, user: userId }).populate(
      'user',
      'username email profile.firstName profile.lastName'
    );

    if (!userRanking) {
      return res.status(404).json({ success: false, error: 'User ranking not found' });
    }

    res.json({ success: true, data: userRanking });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch user ranking' });
  }
});

export default router;
