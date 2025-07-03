const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    name: { //profile name
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    email: {
      type: String,
    },
    address: {
      type: String,
    },
    birthDate: {
      type: Date,
      required: false,
    },
    bloodType: {
      type: String,
      required: false,
    },
    eHealthRecords: {
      type: String,
      required: false,
    },
    insurance: {
      type: String,
    },
    inCaseOfEmergency: {
      type: String,
    },
    journal: {
      type: String,
      required: false,
    },
    image: {
      type: String,
      required: false,
    },
    healthInfo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "HealthInfo",
    },
    providers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Provider",
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
      immutable: true,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Profile", ProfileSchema);
