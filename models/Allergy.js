const mongoose = require('mongoose')

const AllergySchema = new mongoose.Schema({
    trigger: { //cause
        type: String,
        required: true,
    },
    type: { //food, drug, latex, insect, airborne, skin
        type: String,
        required: true,
    },
    reaction: { //mild, moderate, severe
        type: String,
    },
    note: {
        type: String,
        required: false,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
})

module.exports = mongoose.model('Allergy', AllergySchema)