const { render } = require("ejs");
const cloudinary = require("../middleware/cloudinary");
const Profile = require("../models/Profile");
// const Comment = require("../models/Comment");

module.exports = {

  //get all profiles
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

  //** ~get - New profile (display form)
  renderNewPage:  (req, res) => {
    res.render("profiles/new", {profile: new Profile () })
  },

  //Post Profile Route
  createProfile: async (req, res) => {
      // try... Upload image to cloudinary
      // const result = await cloudinary.uploader.upload(req.file.path);

      const profile = new Profile({
        name: req.body.name,
        birthDate: new Date(req.body.birthDate),
        genderAssignedAtBirth: req.body.genderAssignedAtBirth,
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
          if (err){
            let locals = {errorMessage: "Error Creating Profile"}
          res.render('profiles/new', {
            profile: profile,
            locals: locals
          }) 
          }
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
  
  // editProfile: async (req, res) => {
  editProfile: (req, res) => {

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
      if (profile != null) {
        renderEditProfile(res, profile, true)
      }
      else {
        redirect('/')
      }
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
}
  // async function renderNewProfile(res, profile, hasError = false) {
  //   renderFormPage(res, profile, 'new', hasError)
  // }

  // async function renderEditProfile(res, profile, hasError = false) {
  //   try {
  //     const profiles = await Profile.find({})
  //     const params = {
  //       ...
  //     }
  //     if (hasError) {
  //       if (form === 'edit') {
  //         params.errorMessage = 'Sorry, error updating profile'
  //       } else {
  //         params.errorMessage = 'Sorry, error creating profile'
  //       }
  //     }
  //     res.render (`profiles/${form}`, params)
  //   } catch {
  //     res.redirect(`profiles`)
  //   }
  // }

  // async function renderFormPage(res, profile, form, hasError = false) {
  //   const profiles = await Profile.find({})
  //   const params = {
    // ...

  //   }
  // }






