import express, { Request, Response } from 'express';
import { User } from '../models';

const router = express.Router();

// Get all users
router.get('/users', async (req: Request, res: Response) => {
  try {
    const users = await User.find().select('-password');
    res.json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch users' });
  }
});

// Get user by ID
router.get('/users/:id', async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }
    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch user' });
  }
});

// Create new user
router.post('/users', async (req: Request, res: Response) => {
  try {
    const { username, email, password, profile } = req.body;
    const user = new User({ username, email, password, profile });
    await user.save();
    res.status(201).json({ success: true, data: user });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
});

export default router;
