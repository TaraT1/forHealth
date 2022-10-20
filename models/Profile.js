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
    required: true,
  },
  image: {
    type: String,
    require: true,
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
