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

  // router.get("/new", profilesController.renderNewProfile); **WORKS
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
        eHealthRecords: req.body.eHealthRecords,
        journal: req.body.journal,
        image: req.body.image
      })

        try {
          const newProfile = await profile.save()
          console.log("New profile! Whomp")
          res.redirect("/profiles")
        } catch (err) {
          console.log(err);
          res.render('profiles/new', {
            profile: profile
          }) 
          }
      },
 
  //Show profile
  //router.get("/:id", profilesController.getProfile);
  getProfile: async (req, res) => {
    try {
      const profile = await Profile.findById({_id: req.params.id})
        //.where({user: req.user.id}) //User can only view profs they have access 

          res.render("profiles/profile", {
            _id: req.params.id,
            // TS?? profileID: req.params.id,
            profile
          }) 
      } catch (err) { 
        console.log(err)
        res.send("Something went wrong")
      }},

  //router.get("/update/:id", profilesController.editProfile);
  // TS editProfile: async (req, res) => {
  //     const profile = await Profile.findById({_id: req.params.id})
      
  //     if(profile){
  //     res.render("profiles/profile", {
  //       profileID: req.params.id,
  //       name: req.body.name,
  //       eHealthRecords: req.body.eHealthRecords,
  //       journal: req.body.journal 
  //     })
  //   } else { 
  //     res.send("Something went wrong")
  //   }},

  //Update 
  // router.post("/update/:id", profilesController.updateProfile) - page not found error;
  // TS*** router.put("/update/:id", profilesController.updateProfile); //methodoverride not working. No error, no page update***
  updateProfile: async (req, res) => {
       
    
       const profile = Profile.findByIdAndUpdate(req.params.id,
      //  const profile = Profile.findByIdAndUpdate({_id: req.params.id},
        {
          name: req.body.name,
          eHealthRecords: req.body.eHealthRecords,
          journal: req.body.journal}, 
          {new: true});
     
     try { 
      console.log(profile, "Updated profile. Whomp!")
      res.redirect("/profiles");
      } catch (err){
        console.log(profile, err)
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
      res.redirect(`/profiles/${profile._id}`);
      console.log(err)
    }
  }
}