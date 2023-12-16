const { render } = require("ejs");
const cloudinary = require("../middleware/cloudinary");
const User = require("../models/User");
const Provider = require("../models/Provider");
const Profile = require("../models/Profile");
const { trusted } = require("mongoose"); //not sure where this is from
const { ensureAuth, ensureGuest } = require("../middleware/auth");

module.exports = {
  // @desc Show all providers
  // @route GET /providers
  getProviders: async (req, res) => {
    try {
      const providers = await Provider.find({ user: req.user.id }).populate(
        "profiles"
      );
      // const profiles = await Profile.find({user: req.user.id})
      res.render("providers/providers", {
        providers: providers,
      });
      console.log("Providers found");
    } catch (err) {
      //res.send("There were no providers found. Please create a provider by clicking Add New Provider. ")
      console.log(">>>> ", err);
    }
  },
  // @desc    Show add page
  // @router  GET /providers/new
  renderNewPage: async (req, res) => {
    const profiles = await Profile.find({ user: req.user.id });
    // const profile = await Profile.query({ _id: mongoose.Types.ObjectId })//await?
    res.render("providers/new", {
      profiles: profiles,
      // profile: profile,
      provider: new Provider(), //???
    });
  },

  // @desc    Process add provider
  // @router  POST /provider
  createProvider: async (req, res) => {
    // try... Upload image to cloudinary
    // const result = await cloudinary.uploader.upload(req.file.path);

    try {
      // ORIG
      // req.body.user = req.user.id
      // const profiles = await Profile.find({user: req.user.id})
      // const profile = await Profile.query({ _id: mongoose.Types.ObjectId(id) })
      // req.body.profile = req.profile.id

      req.body.user = req.user.id;
      req.body.profiles = Array.isArray(req.body.profiles)
        ? req.body.profiles
        : [req.body.profiles];

      await Provider.create(req.body);

      console.log(">>>> New provider! Whomp");
      res.redirect("/providers");
    } catch (err) {
      console.log(err);
      res.send("Something went wrong");
    }
  },

  // @desc    Show provider
  // @router  GET /providers/:id
  getProvider: async (req, res) => {
    try {
      const profiles = await Profile.find({ user: req.user.id });
      const profile = await Profile.findById(req.params.id);
      const provider = await Provider.findById(req.params.id).populate("user");
      //user.id validation rror. user is [new ObjectId("")]
      // if(provider.user._id != req.user.id) {
      //   res.send('Err 404')
      // console.log(`provider.user._id: ${provider.user._id}`)
      console.log(`req.user.id: ${req.user.id}`);
      // } else{
      res.render("providers/provider", {
        _id: req.params.id,
        profiles: profiles,
        profile: profile,
        provider,
      }); //}
    } catch (err) {
      console.log(err);
      res.send("something went wrong");
    }
  },
  // @desc    Update provider
  // @router  POST /profiles/update/:id
  updateProvider: async (req, res) => {
    try {
      //Error 404
      // req.body.profiles = Array.isArray(req.body.profiles) ? req.body.profiles : [req.body.profiles]

      let provider = await Provider.findOne({
        _id: req.params.id,
        user: req.user.id,
      });
      if (provider) {
        provider = await Provider.findOneAndUpdate(
          { _id: req.params.id },
          req.body,
          {
            new: true,
            runValidators: true,
          }
        );
      }
      console.log(">>> Whomp! Update provider: ", provider);
      res.redirect("/providers");
    } catch (err) {
      console.log(err);
      res.send("Something went wrong");
    }
  },

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
      console.log(err);
    }
  },
};
