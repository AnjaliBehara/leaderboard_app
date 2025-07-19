const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Helper function to generate random points (1 to 10)
const generateRandomPoints = () => Math.floor(Math.random() * 10) + 1;

// @route   GET /api/users
// @desc    Get all users (for user list and leaderboard)
router.get('/', async (req, res) => {
    try {
        const users = await User.find().sort({ totalPoints: -1 }); // Sort by points for leaderboard
        res.json(users);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST /api/users/init
// @desc    Initialize 10 users (run once)
router.post('/init', async (req, res) => {
    try {
        const initialUsers = [
            { name: 'Alice' }, { name: 'Bob' }, { name: 'Charlie' },
            { name: 'David' }, { name: 'Eve' }, { name: 'Frank'},
                { name: 'Grace' }, { name: 'Heidi' }, { name: 'Ivan' },
                { name: 'Judy' }
            ];
                    // Check if users already exist to prevent duplicates on re-init
        const count = await User.countDocuments();
        if (count > 0) {
            return res.status(400).json({ msg: 'Users already initialized' });
        }

        await User.insertMany(initialUsers);
        res.status(201).json({ msg: 'Users initialized successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// @route   POST /api/users/:id/claim
// @desc    Claim points for a specific user
router.post('/:id/claim', async (req, res) => {
    try {
        const userId = req.params.id;
                const points = generateRandomPoints();

        let user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
                    }

        user.totalPoints += points;
        user.claimHistory.push({ points: points }); // Add to claim history

        await user.save();

        // After updating points, fetch the updated leaderboard
        const updatedLeaderboard = await User.find().sort({ totalPoints: -1 });

        res.json({
            message: `Claimed ${points} points for ${user.name}`,
            user: user, // Return updated user details
            leaderboard: updatedLeaderboard // Return updated leaderboard for real-time update
        });
            } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET /api/users/:id/history
// @desc    Get point history for a specific user
router.get('/:id/history', async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.json(user.claimHistory);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
  