const path = require("path");
const { render } = require("ejs");
const User = require("../models/User");
const Profile = require("../models/Profile");
const Provider = require("../models/Provider");
const HealthInfo = require("../models/HealthInfo");
const { trusted } = require("mongoose");
const { ensureAuth, ensureGuest } = require("../middleware/auth");
const profiles = require("./profiles");

module.exports = {
  // @desc Retrieve health information accessible to user
  // @route GET /healthInfoData/
  getHealthInfoData: async (req, res) => {
    try {
      // const profiles = await Profile.find( {user: req.user.id} )
      // !profile add profile
      const healthInfoData = await HealthInfo.find({
        user: req.user.id,
      }).populate("profiles");
      res.render("healthInfo/index", {
        healthInfoData: healthInfoData,
        profiles: profiles,
      });
    } catch (err) {
      console.log(">>>> ", err);
    }
  },

  // Add health information
  // @desc Show add page
  // @route GET /healthInfo/new ***TODO
  renderNewHealthInfo: async (req, res) => {
    const profiles = await Profile.find({ user: req.user.id });
    res.render("healthInfo/new", {
      profiles,
      healthInfo: new HealthInfo(),
    });
  },

  // @desc Create healthInfo route
  // @route POST /healthInfo
  createHealthInfo: async (req, res) => {
    try {
      req.body.user = req.user.id;
      req.body.profiles = Array.isArray(req.body.profiles)
        ? req.body.profiles
        : [req.body.profiles];

      // req.body.profile = req.profile.id

      await HealthInfo.create(req.body);

      console.log(">>>> New health info! Whomp");
      res.redirect("/healthInfo");
    } catch (err) {
      console.log(err);
      res.send("Something went wrong");
    }
  },

  // @desc Get healthInfo (update: get/show, view/edit, update)
  // @route GET [[/profiles/:id/healthInfo]]
  getHealthInfo: async (req, res) => {
    try {
      const profile = await Profile.findById(req.params.id);
      const provider = await Provider.findById(req.params.id);
      const healthInfo = await HealthInfo.findById(req.params.id).populate(
        "user",
        "profile",
        "provider"
      );

      res.render("healthInfo/healthInfo", {
        _id: req.params.id,
        profile,
        provider,
        healthInfo,
      });
    } catch (err) {
      console.log(err);
      res.send("Something went wrong");
    }
  },

  // @desc Update db
  // @route POST /update/:id
  updateHealthInfo: async (req, res) => {},

  // @desc delete healthinfo
  // @route DELETE profiles/:id/healthInfo
  deleteHealthInfo: async (req, res) => {},
};
