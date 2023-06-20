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

  //** ~get - New profile (display form) (previously renderNewPage)
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
            // _id: req.params.id,
            profile
            // name: req.body.name,
            // birthDate: req.body.birthDate,
            // // birthDate: Date(req.body.birthDate),
            // sex: req.body.sex,
            // genderId: req.body.genderId,
            // geneticBackground:
            // req.body.geneticBackground,
            // eHealthRecords: req.body.eHealthRecords,
            // journal: req.body.journal,
            // profile: profile, 
          }) 
      } catch (err) { 
        console.log(err)
        res.send("Something went wrong")
      }},

  

  //Update 
  //router.put("/:id", profilesController.updateProfile);
  updateProfile: async (req, res) => {
    // let profile 
    try {
        const {id} = req.params
        const profile = await Profile.findByIdAndUpdate(id, req.body)
        if(!profile){
          console.log('Something is wrong')
        }

        res.redirect(`/profiles/${profile._id}`)
        console.log("Updated profile. Whomp!")
      } catch (err){
        console.log(err)
      }},
      // profile = await Profile.findOneAndUpdate(
      // await Profile.findOneAndUpdate(
        // profile = await Profile.findByIdAndUpdate(id, req.body)
        // { _id: req.params.id},//params allows query from url
        //   {name: req.body.name,
        //   // birthDate: req.body.birthDate,
        //   birthDate: Date(req.body.birthDate),
        //   sex: req.body.sex,
        //   genderId: req.body.genderId,
        //   geneticBackground: req.body.geneticBackground,
        //   eHealthRecords: req.body.eHealthRecords,
        //   journal: req.body.journal}, 
        //   {returnNewDocument: true}
        //   )

    


      // ** testing findByIdAndUpdate
      // const {id} = req.params
      // const profile = await Profile.findByIdAndUpdate(id, req.body)
      // const profile = await Profile.findByIdAndUpdate(id, req.body, {
      //   new: true
      // }) 
      // if(!profile){
      //   console.log('Error: can\'t find profile')
      // }

    //previous update using .findById() and .save()
    //let profile
    // try {
    //   profile = await Profile.findById({ _id: req.params.id})
    //   profile.name = req.body.name
    //   profile.birthDate = Date(req.body.birthDate)
    //   profile.sex = req.body.sex
    //   profile.genderId = req.body.genderId
    //   profile.geneticBackground = req.body.geneticBackground
    //   profile.eHealthRecords = req.body.eHealthRecords
    //   profile.journal = req.body.journal
    //   await profile.save()
    //   // res.redirect(`/profiles/${req.params.id}`)
    //   res.redirect(`/profiles/${profile.id}`)//difference???
    //   console.log("Updated Profile. Whomp!")
    // } catch (err){
    //   //Profile would be null if it doesn't exist
    //   console.log(err)
    //   if (profile == null) {
    //     res.redirect('/')
    //   } else {
    //     res.render('profiles/edit', {
    //       profile: profile,
    //       errorMessage: 'Error updating Profile' 
    //     })


  //Delete WORKS***
  //router.delete("/:id", profilesController.deleteProfile);
  deleteProfile: async (req, res) => {
    try {
      // Find profile by id
      const profile = await Profile.findById( req.params.id ).lean();
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






