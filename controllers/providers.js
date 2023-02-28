const cloudinary = require("../middleware/cloudinary");
const Provider = require("../models/Provider");
const Profile = require("../models/Profile");
// const Comment = require("../models/Comment");

module.exports = {

  //get all providers
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

  //** ~get - New provider (display form)
  renderNewPage:  (req, res) => {
    res.render("providers/new", {provider: new Provider () })
  },

  //Post Provider Route
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
 
  
  //get one provider 
  getProvider: async (req, res) => {
    try {
      const provider = await Provider.findById(req.params.id).lean();
      const providers = await Provider.find();
      res.render("providers/provider", { provider: provider, providers: providers });
      console.log(provider);
      
    } catch (err) {
      console.log(err);
      res.redirect('/')
    }
  },
  
  //edit
  //get
  
  // editProvider: async (req, res) => {
  editProvider: (req, res) => {

  },

  updateProvider: async (req, res) => {
    
    try {
      const provider = await Provider.findById(req.params.id)
      provider.name = req.body.name,
      provider.specialization = req.body.specialization
      provider.address = req.body.address
      provider.phone = req.body.phone,
      provider.website =  req.body.website
      provider.socials = req.body.socials
      provider.media = req.body.media
      provider.notes = req.body.notes

      await provider.save()
      res.redirect(`/providers/${req.params.id}`)
    } catch (err) {
      console.log(err);
    }
  },

  deleteProvider: async (req, res) => {
    try {
      // Find profile by id
      const provider = await Provider.findById({ _id: req.params.id });
      // Delete image from cloudinary
      //await cloudinary.uploader.destroy(post.cloudinaryId);
      // Delete post from db
      await Provider.remove({ _id: req.params.id });
      console.log("Deleted Provider");
      res.redirect("/providers");
    } catch (err) {
      res.redirect("/providers");
    }
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






