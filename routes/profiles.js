const express = require("express");
const router = express.Router();
const Profile = require("../models/Profile");
const upload = require("../middleware/multer");
const profilesController = require("../controllers/profiles");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Profile Routes
//*Retrieve all profiles
router.get("/", ensureAuth, profilesController.getProfiles);

//*Create profile route
//new profile route to render form
router.get("/new", ensureAuth, profilesController.renderNewProfile);

//Create profile route
router.post("/", ensureAuth, upload.single("file"), profilesController.createProfile); //Note: Need upload... for multer middleware

//*Update Profile (get/show, view/edit, update)
//Show profile
router.get("/:id", ensureAuth, profilesController.getProfile);

//Update db
router.post("/update/:id", ensureAuth, profilesController.updateProfile);

//*Delete profile 
router.delete("/:id", ensureAuth, profilesController.deleteProfile);

module.exports = router;
