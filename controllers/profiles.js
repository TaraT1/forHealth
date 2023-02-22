//const cloudinary = require("../middleware/cloudinary");
const Profile = require("../models/Profile");
// const Comment = require("../models/Comment");

module.exports = {

  //get all profiles
  getProfiles: async (req, res) => {
    
    try {
      const profiles = await Profile.find({});
      res.render("profiles/profiles", { profiles: profiles });
    } 
    catch (err) {
      console.log(err);
    }
  },

  //** ~get - New profile (display form)
  renderNewPage:  (req, res) => {
    res.render("profiles/new", {profile: new Profile () })
  },

  //Post Profile Route
  createProfile: async (req, res) => {
      // try... Upload image to cloudinary
      //const result = await cloudinary.uploader.upload(req.file.path);

      const profile = new Profile({
        name: req.body.name,
        birthDate: new Date(req.body.birthDate),
        genderAssignedAtBirth: req.body.genderAssignedAtBirth,
        genderId: req.body.genderId,
        geneticBackground: req.body.geneticBackground,
        eHealthRecords: req.body.eHealthRecords,
        journal: req.body.journal,
        image: req.body.image,
        _id: req.params.id
        // user: req.user.id,
        // createdAt: req.body.createdAt,
      })
      try {
        const newProfile = await profile.save()
        console.log("New profile! Whomp")
        res.redirect(`profiles/${newProfile._id}`)
        } catch (err) {
          console.log(err)
          res.render('profiles/new', {
            profile: profile,
            errorMessage: "Error Creating Profile"
          })
          }
    },
 
  
  //get one profile
  getProfile: async (req, res) => {
    try {
      // const profile = await Profile.findById({_id: req.params.id});
      const profile = await Profile.findById(req.params.id).lean();
      const profiles = await Profile.find();
      // const profile = await Profile.find({user: req.user.id}).lean() (traversy)
      // res.redirect("/profiles/"+req.params.id);
      res.render("profiles/profile", { profile: profile, profiles: profiles });
      console.log(profile);
      
    } catch (err) {
      console.log(err);
      res.redirect('/')
    }
  },
  
  //edit
  //get
  
  editProfile: async (req, res) => {

  },

  updateProfile: async (req, res) => {
    
    try {
      const profile = await Profile.findById(req.params.id)
      profile.name = req.body.name
      profile.birthDate = new Date(req.body.birthDate)
      profile.sex = req.body.sex
      profile.genderId = req.body.genderId
      profile.geneticBackground = req.body.geneticBackground
      profile.eHealthRecords = req.body.eHealthRecords
      profile.journal = req.body.journal

      await profile.save()
      res.redirect(`/profiles/${req.params.id}`)
    } catch (err) {
      console.log(err);
    }
  },

  deleteProfile: async (req, res) => {
    try {
      // Find profile by id
      const profile = await Profile.findById({ _id: req.params.id });
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


  // async function renderNewProfile(res, profile, hasError = false) {
  //   renderFormPage(res, profile, 'new', hasError)
  // }

  // async function renderFormPage(res, profile, form, hasError = false) {
  //   const profiles = await Profile.find({})
  //   const params = {

  //   }
  // }
}





