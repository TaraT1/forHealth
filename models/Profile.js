const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  name: {
    type: String,
    required: true,
  },
  birthDate: {
    type: Date,
    required: false, 
  },
  eHealthRecords: {
    type: String,
    require: false,
  },
  journal: {
    type: String,
    require: false,
  },
  image: {
    type: String,
    require: false,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  updated: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = mongoose.model('Profile', ProfileSchema);
