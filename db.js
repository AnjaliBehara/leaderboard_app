const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Replace with your MongoDB connection string
        // Example: 'mongodb://localhost:27017/leaderboard' or a MongoDB Atlas URI
        const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/leaderboard_db';
        await mongoose.connect(mongoURI);
        console.log('MongoDB Connected...');
    } catch (err) {
        console.error(err.message);
        // Exit process with failure
        process.exit(1);
    }
};

module.exports = connectDB;

