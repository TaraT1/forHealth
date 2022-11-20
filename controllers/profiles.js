//const cloudinary = require("../middleware/cloudinary");
const Profile = require("../models/Profile");
// const Comment = require("../models/Comment");

module.exports = {
  getProfile: async (req, res) => {
    try {
      // const profile = await Profile.findById({_id: req.params.id});
      const profile = await Profile.findById(req.params.id);
      res.redirect("/profiles/"+req.params.id);
      // res.render("profiles.ejs", { profile: profile });
    } catch (err) {
      console.log(err);
    }
  },
  getProfiles: async (req, res) => {
    try {
      const profiles = await Profile.find({});
      res.render("profiles.ejs", { profiles: profiles });
    } catch (err) {
      console.log(err);
    }
  },
  createProfile: async (req, res) => {
    try {
      // Upload image to cloudinary
      //const result = await cloudinary.uploader.upload(req.file.path);

      await Profile.create({
        name: req.body.name,
        genderAssignedAtBirth: req.body.genderAssignedAtBirth,
        birthDate: req.body.birthDate,
        geneticBackground: req.body.geneticBackground,
        eHealthRecords: req.body.eHealthRecords,
        journal: req.body.journal,
        image: req.body.image,
        _id: req.params.id,
        // user: req.user.id,
        createdAt: req.body.createdAt,
      });
      console.log("Profile has been added!");
      // res.redirect("/profiles");
      res.redirect(`/profiles/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  updateProfile: async (req, res) => {
    try {
      await Profile.findOneAndUpdate(
        { _id: req.params.id },
      );
      console.log("Likes +1");
      res.redirect(`/profiles/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  deleteProfile: async (req, res) => {
    try {
      // Find profile by id
      let profile = await Profile.findById({ _id: req.params.id });
      // Delete image from cloudinary
      //await cloudinary.uploader.destroy(post.cloudinaryId);
      // Delete post from db
      await Profile.remove({ _id: req.params.id });
      console.log("Deleted Profile");
      res.redirect("/profiles");
    } catch (err) {
      res.redirect("/profiles");
    }
  }
};





