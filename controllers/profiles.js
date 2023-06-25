const { render } = require("ejs");
const cloudinary = require("../middleware/cloudinary");
const Profile = require("../models/Profile");
const Provider = require("../models/Provider");
const { trusted } = require("mongoose");
const dayjs = require('dayjs') //not implementing correctly

// const Comment = require("../models/Comment");

module.exports = {

  //get all profiles **WORKS
  //router.get("/", profilesController.getProfiles);
  getProfiles: async (req, res) => {
    
    try {
      const profiles = await Profile.find({});
      res.render("profiles/profiles", { profiles: profiles });
      console.log("Profiles found")
    } 
    catch (err) {
      console.log(err);
    }
  },

  // router.get("/new", profilesController.renderNewProfile);
  renderNewProfile:  (req, res) => {
    res.render("profiles/new", {profile: new Profile () })
  },

  //POST Profile ***WORKS
  //router.post("/", upload.single("file"), profilesController.createProfile);
  createProfile: async (req, res) => {
      // try... Upload image to cloudinary
      // const result = await cloudinary.uploader.upload(req.file.path);

      const profile = new Profile({
        name: req.body.name,
        birthDate: new Date(req.body.birthDate),
        sex: req.body.sex,
        genderId: req.body.genderId,
        geneticBackground: req.body.geneticBackground,
        eHealthRecords: req.body.eHealthRecords,
        journal: req.body.journal,
        image: req.body.image
      })

        try {
          const newProfile = await profile.save()
          console.log("New profile! Whomp")
          res.redirect(`profiles/${newProfile.id}`)      
          // res.redirect("/profiles")
        } catch (err) {
          console.log(err)
          //+renderNewProfile(res, book, true) (Delete the rest of func)
          if (err){
            let locals = {errorMessage: "Error Creating Profile"}
          res.render('profiles/new', {
            profile: profile,
            locals: locals
          }) 
          }
        }
      },
 
  //Show profile
  //router.get("/:id", profilesController.getProfile);
  getProfile: async (req, res) => {
    try {
      const profile = await Profile.findById({_id: req.params.id})
        //.where({user: req.user.id}) //User can only view profs they have access to
        .lean();

          res.render("profiles/profile", {
            profile
          }) 
      } catch (err) { 
        console.log(err)
        res.send("Something went wrong")
      }},

  

  //Update 
  //router.put("/:id", profilesController.updateProfile);
  updateProfile: async (req, res) => {
    let profile 
    try {
        profile = await Profile.findOneAndUpdate(
        { _id: req.params.id}, //params allows query from url
        { name: req.body.name,
          // birthDate: req.body.birthDate,
          birthDate: Date(req.body.birthDate),
          sex: req.body.sex,
          genderId: req.body.genderId,
          geneticBackground: req.body.geneticBackground,
          eHealthRecords: req.body.eHealthRecords,
          journal: req.body.journal}, 
          {new: true}
          )

        res.redirect("/profiles")
        console.log("Updated profile. Whomp!")
      } catch (err){
        console.log(err)
        res.send("Something went wrong")
      }},
    
  //Delete WORKS***
  //router.delete("/:id", profilesController.deleteProfile);
  deleteProfile: async (req, res) => {
    try {
      // Find profile by id
      const profile = await Profile.findById({_id: req.params.id} );
      // Delete image from cloudinary
      //await cloudinary.uploader.destroy(post.cloudinaryId);
      // Delete post from db
      await Profile.deleteOne({ _id: req.params.id });
      console.log("Deleted Profile");
      res.redirect("/profiles");
    } catch (err) {
      res.redirect(`/profiles/${profile.id}`);
      console.log(err)
    }
  }
}