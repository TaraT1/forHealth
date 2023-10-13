const path = require("path")
const { render } = require("ejs");
const cloudinary = require("../middleware/cloudinary");
const User = require("../models/User");
const Profile = require("../models/Profile");
const Provider = require("../models/Provider");
const { trusted } = require("mongoose");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

module.exports = {
  // @desc  Show all profiles
  // @route GET /profiles 
  getProfiles: async (req, res) => {
    try {
      const profiles = await Profile.find( {user: req.user.id} )
        .populate('providers');
      res.render("profiles/profiles", { profiles: profiles });
    } 
    catch (err) {
      // res.send("There were no profiles found. Please create a health profile by clicking Add New Profile.")
      console.log(">>>>> ", err);
    }
  },
  // @desc  Show add page
  // @route GET /profiles/new 
  renderNewProfile:  (req, res) => {
    res.render("profiles/new", { profile: new Profile () })  
  },

  // @desc  Process add profile 
  // @route POST /profiles
  createProfile: async (req, res) => {
      // try... Upload image to cloudinary

      try {
      // const result = await cloudinary.uploader.upload(req.file.path);

      req.body.user = req.user.id 
      await Profile.create(req.body)

      res.redirect('/profiles')
        
        } catch(err) {
          console.log(err);
          res.send("Something went wrong") 
          }
      },
 
  // @desc    Show profile
  // @router  GET /profiles/:id
  getProfile: async (req, res) => {
    try {
      const profile = await Profile.findById(req.params.id).populate('user')
        if(profile.user._id != req.user.id) {
          res.send("Err 404")
        } else {
          res.render("profiles/profile", {
            _id: req.params.id,
            profile
          }) 
        }
      } catch (err) { 
        console.log(err)
        res.send("Something went wrong")
      }},

  // @desc    Update profile
  // @router  POST /profiles/update/:id
  updateProfile: async (req, res) => {
    
     try { 
       const profile = await Profile.findByIdAndUpdate({_id: req.params.id},
        {
          name: req.body.name,
          birthDate: req.body.birthDate,
          eHealthRecords: req.body.eHealthRecords,
          journal: req.body.journal}, 
          {new: true});
     
      console.log(">>> Whomp! Updated profile: ", profile)
      res.redirect("/profiles");
      } catch (err){
        console.log(profile, err)
        res.send("Something went wrong")
      }},
    
  // @desc    Delete profile  
  // @router  DELETE /profiles/:id
  deleteProfile: async (req, res) => {
    try {
      const profile = await Profile.findById({_id: req.params.id} );
      // Delete image from cloudinary
      //await cloudinary.uploader.destroy(post.cloudinaryId);

      // Delete profile from db
      await Profile.deleteOne({ _id: req.params.id });
      console.log("Deleted Profile");
      res.redirect("/profiles");
    } catch (err) {
      res.redirect(`/profiles/${profile._id}`);
      console.log(err)
    }
  }
}