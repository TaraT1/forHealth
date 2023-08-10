const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const UserSchema = new Schema({
    googleId: {
        type: String,
        required: false 
    },
    displayName: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    profileImage: {
        type: String,
        required: false 
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

})

module.exports = mongoose.model('User', UserSchema);