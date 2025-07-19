const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // For handling CORS issues between frontend and backend
const userRoutes = require('./routes/userRoutes');
const connectDB = require('./config/db'); // Database connection function

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Body parser for JSON requests

// Routes
app.use('/api/users', userRoutes);

// Simple root route for testing
app.get('/', (req, res) => {
    res.send('Leaderboard API is running!');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

