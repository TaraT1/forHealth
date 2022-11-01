const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  genderAssignedAtBirth: {
    type: String,
    required: true,
  },
  birthDate: {
    type: Date,
    required: true,
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
    default: Date.now,
  },
});

module.exports = mongoose.model("Profile", ProfileSchema);
