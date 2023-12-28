const path = require("path");
const { render } = require("ejs");
const User = require("../models/User");
const Profile = require("../models/Profile");
const Provider = require("../models/Provider");
const HealthInfo = require("../models/HealthInfo");
const { trusted } = require("mongoose");
const { ensureAuth, ensureGuest } = require("../middleware/auth");
const providers = require("./providers");

module.exports = {
  // @desc Retrieve health information accessible to user
  // @route GET /healthInfoRecords/
  getHealthInfoRecords: async (req, res) => {
    try {
      // const profiles = await Profile.find( {user: req.user.id} )
      // !profile add profile
      const healthInfoRecords = await HealthInfo.find({ user: req.user.id })
        .populate("profile")
        .populate("providers");
      res.render("healthInfo/index", { healthInfoRecords });
      console.log("Health info found")
    } catch (err) {
      console.log(">>>> ", err);
    }
  },

  // Add health information
  // @desc Show add page
  // @route GET /healthInfo/new ***TODO
  renderNewHealthInfo: async (req, res) => {
    const profiles = await Profile.find({ user: req.user.id });
    const providers = await Provider.find({ user: req.user.id })
    res.render("healthInfo/new", { profiles, providers });
  },

  // @desc Create healthInfo route
  // @route POST /healthInfo
  createHealthInfo: async (req, res) => {
    try {
      req.body.user = req.user.id;
      req.body.providers = Array.isArray(req.body.providers)
        ? req.body.providers
        : [req.body.providers];

      await HealthInfo.create(req.body);

      console.log(">>>> New health info! Whomp");
      res.redirect("/healthInfo");
    } catch (err) {
      console.log(err);
      res.send("Something went wrong");
      res.redirect("/healthInfo")
    }
  },

  // @desc Get healthInfo (update: get/show, view/edit, update)
  // @route GET [[/:id]]
  getHealthInfo: async (req, res) => {
    try {
      const healthInfo = await HealthInfo.findOne({_id: req.params.id, user: req.user.id }) 
      const profiles = await Profile.find({user: req.user.id});
      const providers = await Provider.find({user: req.user.id})

      if (!healthInfo) return res.redirect("/healthInfo")

      res.render("healthInfo/healthInfo", {
        healthInfo,
        profiles,
        providers,
      });
    } catch (err) {
      console.log(err);
      res.send("Something went wrong");
    }
  },

  // @desc Update db
  // @route POST /update/:id
  updateHealthInfo: async (req, res) => {
    try {
        req.body.providers = Array.isArray(req.body.providers)
            ? req.body.providers 
            : [req.body.providers]
        let healthInfo = await HealthInfo.findOne({ _id: req.params.id, user: req.user.id })
        if (healthInfo) {
            healthInfo = await HealthInfo.findOneAndUpdate({ _id: req.params.id}, req.body, { 
                new: true, 
                runValidators: true,
            })
            res.redirect("/healthInfo")
        } else {
            res.redirect("/dashboard")
        }
    } catch (err) {
    console.error(err)
    res.redirect("/dashboard")
    res.send("Something went wrong")
    }
  },

  // @desc delete healthinfo
  // @route DELETE profiles/:id/healthInfo
  deleteHealthInfo: async (req, res) => {
    try {
        await HealthInfo.deleteOne({_id: req.params.id, user: req.user.id})
        res.redirect("/healthInfo")
    } catch (err) {
        console.error(err)
        res.redirect(`/healthInfo/${healthInfo._id}`)
    }
  },
};
