const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const profilesController = require("../controllers/profiles");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Profile Routes - simplified for now
router.get("/:id", ensureAuth, profilesController.getProfile);

router.post("/createProfile", upload.single("file"), profilesController.createProfile);

//router.put("/editProfile/:id", profilesController.editProfile);

//router.delete("/deleteProfile/:id", profilesController.deleteProfile);

module.exports = router;
