const express = require('express');
const router = express.Router();
const User = require('../models/User'); // User Mongoose model
const History = require('../models/History'); // History Mongoose model

// GET: Get all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST: Add a new user
router.post('/users', async (req, res) => {
  try {
    const { name } = req.body;
    const newUser = new User({ name, totalPoints: 0 });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST: Claim random points
router.post('/claim', async (req, res) => {
  try {
    const { userId } = req.body;
    const points = Math.floor(Math.random() * 10) + 1;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    user.totalPoints += points;
    await user.save();

    // Save claim history
    const history = new History({
      userId: user._id,
      userName: user.name,
      pointsClaimed: points,
      claimedAt: new Date()
    });
    await history.save();

    res.json({ user, pointsClaimed: points });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET: Leaderboard (sorted users)
router.get('/leaderboard', async (req, res) => {
  try {
    const users = await User.find({}).sort({ totalPoints: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
