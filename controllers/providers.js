const { render } = require("ejs");
const cloudinary = require("../middleware/cloudinary");
const Provider = require("../models/Provider");
const Profile = require("../models/Profile");
// const Comment = require("../models/Comment");

module.exports = {

  // @desc Show all providers 
  // @route GET /providers
  getProviders: async (req, res) => {
    
    try {
      const providers = await Provider.find({});
      res.render("providers/providers", { providers: providers });
      console.log("Providers found")
    } 
    catch (err) {
      console.log(err);
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

      const provider = new Provider({
        name: req.body.name,
        specialization: req.body.specialization,
        address: req.body.address,
        phone: req.body.phone,
        website: req.body.website,
        socials: req.body.socials,
        media: req.body.media,
        notes: req.body.notes,
        profile: req.body.profile
      })
      

        try {
          const newProvider = await provider.save()
          const providers = await Provider.find({});
          const profiles = await Profile.find({})
          console.log("New provider! Whomp")
          let params = {
            providers: providers, 
            profiles: profiles
          }
          // res.redirect(`providers/${newProvider.id}` )      
          res.render(`providers/${newProvider.id}`, params )      
          // res.redirect("/providers")
        } catch (err) {
          console.log(err)
          if (err){
            let locals = {errorMessage: "Error Creating Provider"}
          res.render('providers/new', {
            provider: provider,
            locals: locals
          }) 
          }
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
        })
      }
      } catch (err) {
        console.log(err);
        res.send("something went wrong")
    }},
  
  // @desc    Update provider
  // @router  POST /profiles/update/:id
  updateProvider: async (req, res) => {
    
    try {
      const provider = await Provider.findByIdAndUpdate({_id: req.params.id},
      {
      name: req.body.name,
      specialization: req.body.specialization,
      address: req.body.address,
      phone: req.body.phone,
      website:  req.body.website,
      socials: req.body.socials,
      media: req.body.media,
      notes: req.body.notes},
      {new: true})

      console.log(">>> Whomp! Update provider: ", provider)
      res.redirect("/providers")
    } catch (err) {
      console.log(provider, err)
      res.send("Something went wrong")
    }},
    
    // @desc    Delete provider
    // @router  DELETE /providers/:id
  deleteProvider: async (req, res) => {
    try {
      // Find profile by id
      const provider = await Provider.findById({ _id: req.params.id });
      // Delete image from cloudinary
      //await cloudinary.uploader.destroy(post.cloudinaryId);
      // Delete provider from db
      await Provider.deleteOne({ _id: req.params.id });
      console.log("Deleted Provider");
      res.redirect("/providers");
    } catch (err) {
      res.redirect(`/providers/${providder._id}`);
      console.log(err)
    }
  }
}