const { render } = require("ejs");
const cloudinary = require("../middleware/cloudinary");
const Profile = require("../models/Profile");
const Provider = require("../models/Provider");
const { trusted } = require("mongoose");
const dayjs = require('dayjs') //not implementing correctly

// const Comment = require("../models/Comment");

module.exports = {

  //get all profiles 
  //router.get("/", profilesController.getProfiles);
  getProfiles: async (req, res) => {
    
    try {
      const profiles = await Profile.find({});
      // const profiles = await Profile.find({ user: req.user.id}).lean();
      res.render("profiles/profiles", { profiles: profiles });
      console.log("Profiles found")
    } 
    catch (err) {
      res.send("There were no profiles found. Please create a health profile by clicking Add New Profile.")
      console.log(err);
    }
  },

  // router.get("/new", profilesController.renderNewProfile); 
  renderNewProfile:  (req, res) => {
    res.render("profiles/new", {profile: new Profile () })
  },

  //POST Profile 
  //router.post("/", upload.single("file"), profilesController.createProfile);
  createProfile: async (req, res) => {
      // try... Upload image to cloudinary
      // const result = await cloudinary.uploader.upload(req.file.path);

      try {
      const profile = new Profile({
        name: req.body.name,
        birthDate: req.body.birthDate,
        eHealthRecords: req.body.eHealthRecords,
        journal: req.body.journal,
        image: req.body.image
      })

          // const newProfile = await profile.save()
          console.log("New profile! Whomp")
          res.redirect("/profiles")
        
        } catch(err) {
          console.log(err);
          res.send("Something went wrong") 
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
            profile
          }) 
      } catch (err) { 
        console.log(err)
        res.send("Something went wrong")
      }},

  //Update 
  // router.post("/update/:id", profilesController.updateProfile)
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
    
  //Delete
  //router.delete("/:id", profilesController.deleteProfile);
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