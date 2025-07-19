const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    totalPoints: {
        type: Number,
                default: 0
    },
    claimHistory: [ // To store all user point activity
        {
            points: {
                type: Number,
                required: true
            },
            timestamp: {
                type: Date,
                default: Date.now
            }
        }
    ]
});

module.exports = mongoose.model('User', UserSchema);

