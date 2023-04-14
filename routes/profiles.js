const express = require("express");
const router = express.Router();
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

//*Update Profile
//Show profile
router.get("/:id", profilesController.getProfile);

//Edit profile
router.get("/:id/edit", profilesController.editProfile);

//Update db
router.put("/:id", profilesController.updateProfile);

//*Delete profile - setting up to use form and method override
router.delete("/:id", profilesController.deleteProfile);

module.exports = router;
