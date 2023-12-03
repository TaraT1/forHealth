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
    requirements: [{
        reqName: String,
        reqDescription: String,
        reqStatus: String,
    }],
    recommendations: [{
        recName: String,
        recDescription: String,
        recStatus: String,
    }],
    medicine: [{
        medName: String,
        medDescription: String,
        medDosage: String,
        medProvider: mongoose.Schema.Types.ObjectId, ref: 'Provider',
        medDateStart: Date,
        medDateEnd: Date,
    }],
    vaccinations: [{
        vaxName: String,
        vaxDescription: String,
        vaxDate: Date,
        vaxProvder: mongoose.Schema.Types.ObjectId, ref: 'Provider',
    }],
    supplements: [{
        suppName: String,
        suppNote: String,
        suppDateStart: Date,
        suppDateEnd: Date,
    }],
    events: [{
        eventTitle: String,
        eventDescription: String,
        eventDate: Date,
        eventOutcome: String,
    }],
    allergies: [{
        allergyTrigger: String,
        allergyType: String, //food, drug, latex, insect, airborne, skin
        allergyReaction: String, //mild, moderate, severe
        allergyNote: String,
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