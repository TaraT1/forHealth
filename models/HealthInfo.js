const mongoose = require('mongoose')

const HealthInfoSchema = new mongoose.Schema(
    {
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile',
    },
    notes: [{
        name: String,
        description: String,
    }],
    tasks: [{
        name: String,
        description: String,
        status: String,
    }],
    medicine: [{
        name: String,
        description: String,
        dosage: String,
        provider: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Provider'},
        dateStart: Date,
        dateEnd: Date,
    }],
    vaccinations: [{
        name: String,
        description: String,
        date: Date,
        provder: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Provider'},
    }],
    supplements: [{
        name: String,
        note: String,
        dateStart: Date,
        dateEnd: Date,
    }],
    events: [{
        title: String,
        description: String,
        date: Date,
        outcome: String,
    }],
    allergies: [{
        trigger: String,
        type: String, //food, drug, latex, insect, airborne, skin
        reaction: String, //mild, moderate, severe
        note: String,
    }],
    conditions: [{
        name: String,
        type: String,
        note: String,
    }],
},
{timestamps: true}
)

module.exports = mongoose.model('HealthInfo', HealthInfoSchema)