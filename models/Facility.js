const mongoose = require('mongoose');

const FacilitySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    specialization: {
        type: String,
    },
    address: {
        type: String, required: false,
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
    providers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Provider',
    }],
    profiles: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile',
    }],
    user: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    createdAt: {
        type: Date,
        immutable: true,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
},
{timestamps: true},
);

module.exports = mongoose.model('Facility', FacilitySchema);