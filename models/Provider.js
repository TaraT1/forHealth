const mongoose = require("mongoose");

const ProviderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    title: {
      type: String,
      required: false,
    },
    specialization: {
      type: String,
      required: false,
    },
    address: {
      type: String,
      required: false,
    },
    phone: {
      type: String,
      required: false,
    },
    website: {
      type: String,
      required: false,
    },
    socials: {
      type: String,
      required: false,
    },
    media: {
      type: String,
      required: false,
    },
    notes: {
      type: String,
      required: false,
    },
    profiles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Profile",
      },
    ],
    healthInfo: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "HealthInfo",
      },
    ],
    facilities: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Facility",
      },
    ],
    user: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    createdAt: {
      type: Date,
      immutable: true,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Provider", ProviderSchema);
