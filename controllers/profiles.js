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

  //** ~get - New profile (display form) (previously renderNewPage)
  renderNewProfile:  (req, res) => {
    res.render("profiles/new", {profile: new Profile () })
  },

  //POST Profile 
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
 
  
  //edit Update: get/show, view/edit, update
  //get one profile
  getProfile: async (req, res) => {
    try {
      const profile = await Profile.findById(req.params.id).lean();
      const profiles = await Profile.find();
      // res.redirect("/profiles/"+req.params.id);
      res.render('profiles/profile', { 
        profile: profile, 
        profiles: profiles 
      });
      console.log(profile);
      
    } catch  {
      res.redirect('/profiles')
    }
  },
  
  //get profile to edit 
  editProfile: async (req, res) => {
    try {
      const profile = await Profile.findById(req.params.id).lean()
      res.render('profiles/edit', { profile: profile })
    } catch {
      res.redirect('/profiles')
    }
  }, 
  
  //     renderEditProfile(res, profile)
  //   } catch {
  //     res.redirect('/profiles/:id')
  //   }
  // },

  // renderEditProfile: async (res, profile, hasError = false)  => {
  //   renderFormPage(res, profile, 'edit', hasError)
  // },
  
  // ***Render form refactor, error handling
  // renderFormPage: async (res, profile, form, hasError = false)  => {
  //   try {
  //     const profiles = await Profile.find({})
  //     const params = {
  //       profile: profile,
  //       profiles: profiles
  //     }
  //     if (hasError) {
  //       if (form === 'edit') {
  //         params.errorMessage = 'Error Updating Profile'
  //       } else {
  //         params.errorMessage = 'Error Creating Profile'
  //       }
  //     }
  //     res.render(`profiles/${form}`, params)
  //   } catch {
  //     res.redirect('/profiles')
  //   }
  // },

  //Update
  updateProfile: async (req, res) => {
    let profile
    try {
      profile = await Profile.findById(req.params.id)
      profile.name = req.body.name
      profile.birthDate = new Date(req.body.birthDate)
      profile.sex = req.body.sex
      profile.genderId = req.body.genderId
      profile.geneticBackground = req.body.geneticBackground
      profile.eHealthRecords = req.body.eHealthRecords
      profile.journal = req.body.journal

      await profile.save()
      res.redirect(`/profiles/${profile.id}`)
    } catch {
      if (profile == null) {
        res.redirect('/')
      } else {
        res.render('profiles/edit', {
          profile: profile
        })
      }
    }
  },

  //Delete
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






