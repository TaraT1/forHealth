const mongoose = require('mongoose')
const Provider = require('./Provider')
const Profile = require('./Profile')

const HealthInfoSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile',
    },
    requirements: {
        name: String,
        description: String,
        status: String,
    },
    recommendations: {
        name: String,
        description: String,
        status: String,
    },
    events: {
        title: String,
        description: String,
        date: Date,
        outcome: String,
    },
    allergies: {
        trigger: String,
        type: String, //food, drug, latex, insect, airborne, skin
        reaction: String, //mild, moderate, severe
        note: String,
    },
    conditions: {
        name: String,
        type: String,
        note: String,
    },
},
{timestamps: true}
)

module.exports = mongoose.model('HealthInfo', HealthInfoSchema)