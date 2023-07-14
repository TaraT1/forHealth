const express = require("express");
const router = express.Router();
const Profile = require("../models/Profile");
const upload = require("../middleware/multer");
const profilesController = require("../controllers/profiles");
//const { ensureAuth } = require("../middleware/auth");

//Profile Routes
//*Retrieve all profiles
router.get("/", profilesController.getProfiles);

// router.get("/", ensureAuth, profilesController.getProfiles);

//*Create profile route
//new profile route to render form
router.get("/new", profilesController.renderNewProfile);

//Create profile route
router.post("/", upload.single("file"), profilesController.createProfile);

//*Update Profile (get/show, view/edit, update)
//Show profile
router.get("/:id", profilesController.getProfile);

//Edit profile
// TS router.get("/update/:id", profilesController.editProfile);

//Update db
router.post("/update/:id", profilesController.updateProfile);
// router.put("/:id", profilesController.updateProfile);//not working

//*Delete profile - setting up to use form and method override
// router.delete("/edit/:id", profilesController.deleteProfile);
router.delete("/:id", profilesController.deleteProfile);

module.exports = router;
