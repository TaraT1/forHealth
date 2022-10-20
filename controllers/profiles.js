const cloudinary = require("../middleware/cloudinary");
const Profile = require("../models/Profile");
// const Comment = require("../models/Comment");

module.exports = {
  getProfile: async (req, res) => {
    try {
      const profiles = await Profile.find({ user: req.user.id });
      res.render("profile.ejs", { profiles: profiles, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  // getFeed: async (req, res) => {
  //   try {
  //     const posts = await Post.find().sort({ createdAt: "desc" }).lean();
  //     res.render("feed.ejs", { posts: posts });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // },
  // getPost: async (req, res) => {
  //   try {
  //     const post = await Post.findById(req.params.id);
  //     const comments = await Comment.find({post: req.params.id}).sort({ createdAt: "desc" }).lean();
  //     res.render("post.ejs", { post: post, user: req.user, comments: comments });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // },
  createProfile: async (req, res) => {
    try {
      // Upload image to cloudinary
      // const result = await cloudinary.uploader.upload(req.file.path);

      await Profile.create({
        genderAssignedAtBirth: req.body.genderAssignedAtBirth,
        birthDate: req.body.birthDate,
        geneticBackground: req.body.geneticBackground,
        user: req.user.id,
      });
      console.log("Profile has been added!");
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
    }
  },//Need update profile
  // likePost: async (req, res) => {
  //   try {
  //     await Post.findOneAndUpdate(
  //       { _id: req.params.id },
  //       {
  //         $inc: { likes: 1 },
  //       }
  //     );
  //     console.log("Likes +1");
  //     res.redirect(`/post/${req.params.id}`);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // },
  deleteProfile: async (req, res) => {
    try {
      // Find profile by id
      let profile = await Profile.findById({ _id: req.params.id });
      // // Delete image from cloudinary
      // await cloudinary.uploader.destroy(post.cloudinaryId);
      // Delete profile from db
      await Profile.remove({ _id: req.params.id });
      console.log("Deleted Profile");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
};
