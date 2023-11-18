const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    googleId: {
        type: String,
        required: true,
    },
    displayName: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    profileImage: {
        type: String,
        required: false, 
    },
    createdAt: {
        type: Date,
        immutable: true,
        default: Date.now,
    },
},
{timestamps: true}
)

module.exports = mongoose.model('User', UserSchema);