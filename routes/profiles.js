const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const profilesController = require("../controllers/profiles");
const Profile = require("../models/Profile");
//const { ensureAuth } = require("../middleware/auth");

//Profile Routes
//All profiles
router.get("/", profilesController.getProfiles);

// router.get("/", ensureAuth, profilesController.getProfiles);

//new profile route to render form
router.get("/new", profilesController.renderNewPage);
//create profile route
router.post("/", profilesController.createProfile);
//orig: router.post("/createProfile", profilesController.createProfile);

//Get sgl profile
router.get("/:id", profilesController.getProfile);

//Edit profile
router.get("/:id/edit", profilesController.editProfile);

router.put("/:id", profilesController.updateProfile);

router.delete("/:id", profilesController.deleteProfile);

module.exports = router;
