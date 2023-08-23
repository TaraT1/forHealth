const mongoose = require('mongoose');

const ProviderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    specialization: {
        type: String,
        required: false,
    },
    address: {
        type: String,
        required: false,
    },
    phone: {
        type: String,
        required: false,
    },
    website: {
        type: String,
        required: false,
    },
    socials: {
        type: String,
        required: false,
    },
    media: {
        type: String,
        require: false,
    },
    notes: {
        type: String,
        required: false,
    },
    profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile',
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
    updated: {
        type: Date,
        required: true,
        default: Date.now
    }
});

module.exports = mongoose.model('Provider', ProviderSchema);