const { render } = require("ejs");
const cloudinary = require("../middleware/cloudinary");
const User = require("../models/User");
const Provider = require("../models/Provider");
const Profile = require("../models/Profile");
const { trusted } = require("mongoose");
const { ensureAuth, ensureGuest } = require("../middleware/auth")

module.exports = {

  // @desc Show all providers 
  // @route GET /providers
  getProviders: async (req, res) => {
    
    try {
      req.body.user = req.user.id
      console.log("User is: ", req.user) //???
      const profiles = await Profile.find({user: req.user.id})
      const profileName = profiles.name
      const providers = await Provider.find({
        user: req.user.id,
      }); //TS
      res.render("providers/providers", { providers: providers });
      console.log("Providers found")
    } 
    catch (err) {
      //res.send("There were no providers found. Please create a provider by clicking Add New Provider. ")
      console.log(">>>> ", err);
    }
  },
  // @desc    Show add page
  // @router  GET /providers/new
  renderNewPage:  (req, res) => {
    res.render("providers/new", {provider: new Provider () })
  },

  // @desc    Process add provider
  // @router  POST /profiles
  createProvider: async (req, res) => {
      // try... Upload image to cloudinary
      // const result = await cloudinary.uploader.upload(req.file.path);

      try {
      req.body.user = req.user.id
      // req.body.profile = req.profile.id
      await Provider.create({
        name: req.body.name,
        specialization: req.body.specialization,
        address: req.body.address,
        phone: req.body.phone,
        website: req.body.website,
        socials: req.body.socials,
        media: req.body.media,
        notes: req.body.notes,
        // profile: req.body.profile,
        user: req.body.user
      })

      console.log(">>>> New provider! Whomp")
      res.redirect('/providers')
    
    } catch(err) {
      console.log(err)
      res.send("Something went wrong")
    }
  },

  // @desc    Show provider
  // @router  GET /providers/:id
  getProvider: async (req, res) => {
    try {
      const provider = await Provider.findById(req.params.id).populate('user');
      if(provider.user._id != req.user.id) {
        res.send('Err 404')
      } else{ 
        res.render("providers/provider", { 
          _id: req.params.id,
          provider
        }) }
      } catch (err) {
        console.log(err);
        res.send("something went wrong")
    }},
  // @desc    Update provider
  // @router  POST /profiles/update/:id
  updateProvider: async (req, res) => {
    
    try {
      //Get profiles associated with user in order to link profile to provide
      const profiles = await Profile.find({user: req.user.id})

      const provider = await Provider.findByIdAndUpdate({_id: req.params.id},
      {
      name: req.body.name,
      specialization: req.body.specialization,
      address: req.body.address,
      phone: req.body.phone,
      website:  req.body.website,
      socials: req.body.socials,
      media: req.body.media,
      notes: req.body.notes,
      },
      {new: true})

      console.log(">>> Whomp! Update provider: ", provider)
      res.redirect("/providers")

    } catch (err) {
      console.log(err)
      res.send("Something went wrong")
    }},
    
  // @desc    Delete provider
  // @router  DELETE /providers/:id
  deleteProvider: async (req, res) => {
    try {
      const provider = await Provider.findById({ _id: req.params.id });
      // Delete image from cloudinary
      //await cloudinary.uploader.destroy(post.cloudinaryId);

      // Delete provider from db
      await Provider.deleteOne({ _id: req.params.id });
      console.log("Deleted Provider");
      res.redirect("/providers");
    } catch (err) {
      res.redirect(`/providers/${provider._id}`);
      console.log(err)
    }
  }
}