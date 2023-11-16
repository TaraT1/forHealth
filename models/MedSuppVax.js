const mongoose = require('mongoose')

const MedSuppVaxSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile',
    },
    medicine: {
        medName: String,
        description: String,
        dosage: String,
        provider: mongoose.Schema.Types.ObjectId,
            ref: 'Provider',
        dateStart: Date,
        dateEnd: Date,
    },
    supplements: {
        suppName: String,
        note: String,
        dateStart: Date,
        dateEnd: Date,
    },
    vax: {
        vaxName: String,
        date: Date,
        note: String,
        provider: mongoose.Schema.Types.ObjectId,
            ref: 'Provider',
    },
},
{timestamps: true},
)

module.exports = mongoose('MedSuppVax', MedSuppVaxSchema)