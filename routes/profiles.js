const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const profilesController = require("../controllers/profiles");
//const { ensureAuth } = require("../middleware/auth");

//Profile Routes - simplified for now
router.get("/", profilesController.getProfiles);
// router.get("/", ensureAuth, profilesController.getProfiles);

router.post("/createProfile", profilesController.createProfile);

//router.put("/editProfile/:id", profilesController.editProfile);

//router.delete("/deleteProfile/:id", profilesController.deleteProfile);

module.exports = router;
