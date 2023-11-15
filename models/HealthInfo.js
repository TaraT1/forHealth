const mongoose = require('mongoose')

const HealthInfoSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile',
    },
    events: {
        type: String,
    },
    allergies: {
        trigger: String,
        type: String, //food, drug, latex, insect, airborne, skin
        reaction: String, //mild, moderate, severe
        note: String,
    },
    conditions: {
        type: String,
        note: String,
    },
},
{timestamps: true}
)

module.exports = mongoose.model('HealthInfo', HealthInfoSchema)