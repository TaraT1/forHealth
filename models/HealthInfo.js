const mongoose = require("mongoose");

const HealthInfoSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    profile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile",
      required: true,
    },
    providers: [
      {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Provider",
      },
    ],
    notes: [
      {
        noteTitle: String,
        noteDescription: String,
      },
    ],
    tasks: [
      {
        taskName: String,
        taskDescription: String,
        taskStatus: String,
      },
    ],
    prescriptions: [
      {
        prescriptionName: String,
        prescriptionDescription: String,
        prescriptionDosage: String,
        provider: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Provider",
        },
        prescriptionDateStart: Date,
        prescriptionDateEnd: Date,
      },
    ],
    vaccinations: [
      {
        vaxName: String,
        vaxDescription: String,
        vaxDate: Date,
        provider: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Provider",
        },
      },
    ],
    supplements: [
      {
        supplementName: String,
        supplementNote: String,
        supplementDateStart: Date,
        supplementDateEnd: Date,
      },
    ],
    events: [
      {
        eventTitle: String,
        eventDescription: String,
        eventDate: Date,
        eventOutcome: String,
      },
    ],
    allergies: [
      {
        allergyTrigger: String,
        allergyType: String, //food, drug, latex, insect, airborne, skin
        allergyReaction: String, //mild, moderate, severe
        allergyNote: String,
      },
    ],
    conditions: [
      {
        conditionName: String,
        conditionType: String,
        conditionNote: String,
      },
    ],
    recommendations: [
      {
        recName: String,
        recType: String,
        recNote: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("HealthInfo", HealthInfoSchema);
