import express, { Request, Response } from 'express';
import { Team } from '../models';

const router = express.Router();

// Get all teams
router.get('/teams', async (req: Request, res: Response) => {
  try {
    const teams = await Team.find()
      .populate('leader', 'username email profile.firstName profile.lastName')
      .populate('members', 'username email profile.firstName profile.lastName');
    res.json({ success: true, data: teams });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch teams' });
  }
});

// Get team by ID
router.get('/teams/:id', async (req: Request, res: Response) => {
  try {
    const team = await Team.findById(req.params.id)
      .populate('leader', 'username email profile.firstName profile.lastName')
      .populate('members', 'username email profile.firstName profile.lastName');
    if (!team) {
      return res.status(404).json({ success: false, error: 'Team not found' });
    }
    res.json({ success: true, data: team });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch team' });
  }
});

// Create new team
router.post('/teams', async (req: Request, res: Response) => {
  try {
    const { name, description, leader, members } = req.body;
    const team = new Team({
      name,
      description,
      leader,
      members: members || [],
    });
    await team.save();
    res.status(201).json({ success: true, data: team });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Add member to team
router.post('/teams/:id/members', async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    const team = await Team.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { members: userId } },
      { new: true }
    ).populate('members');
    res.json({ success: true, data: team });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to add member' });
  }
});

export default router;
