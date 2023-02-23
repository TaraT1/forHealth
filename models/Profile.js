const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  birthDate: {
    type: Date,
    required: true,
  },
  genderAssignedAtBirth: {
    type: String,
    required: true,
  },
  genderId: {
    type: String,
    required: false,
  },
  geneticBackground: {
    type: String,
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
  todo: {
    type: String,
    require: false,
  },
  image: {
    type: String,
    require: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = mongoose.model("Profile", ProfileSchema);
