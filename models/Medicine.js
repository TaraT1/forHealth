const mongoose = require('mongoose')

const MedicineSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    prescriber: {
        type: String,
    },
    dateStart: {
        type: Date,
    },
    dateEnd: {
        type: Date,
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
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }

})

module.exports = mongoose.model('Medicine', MedicineSchema)