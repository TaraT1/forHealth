const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const providersController = require("../controllers/providers");
//const { ensureAuth } = require("../middleware/auth");

//Provider Routes
//All providers
router.get("/", providersController.getProviders);

// router.get("/", ensureAuth, profilesController.getProfiles);

//new provider route to render form
router.get("/new", providersController.renderNewPage);
//create profile route
router.post("/", upload.single("file"), providersController.createProvider);

//Get sgl profile
router.get("/:id", providersController.getProvider);

//Edit profile
router.get("/update/:id", providersController.editProvider);

router.put("/update/:id", providersController.updateProvider);

router.delete("/:id", providersController.deleteProvider);

module.exports = router;