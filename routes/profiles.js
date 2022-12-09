const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const profilesController = require("../controllers/profiles");
const Profile = require("../models/Profile");
//const { ensureAuth } = require("../middleware/auth");

//Profile Routes
//Get single profile from id (+search)
//Traversy, +ensureAuth
router.get("/:id", profilesController.getProfile);

router.get("/", profilesController.getProfiles);
// router.get("/", ensureAuth, profilesController.getProfiles);

router.post("/createProfile", profilesController.createProfile);

router.put("/editProfile/:id", profilesController.updateProfile);

//router.delete("/deleteProfile/:id", profilesController.deleteProfile);

module.exports = router;
