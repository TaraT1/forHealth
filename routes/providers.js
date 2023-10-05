const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const providersController = require("../controllers/providers");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Provider Routes
//Retrieve all providers
// router.get("/", providersController.getProviders);
router.get("/", ensureAuth, providersController.getProviders);

//new provider route to render form
router.get("/new", ensureAuth, providersController.renderNewPage);

//create provider route
router.post("/", ensureAuth, upload.single("file"), providersController.createProvider); //need upload... multer middleware for POST route

//Show provider (get/show, view/edit)
router.get("/:id", ensureAuth, providersController.getProvider);

//update db
router.post("/update/:id", ensureAuth, providersController.updateProvider);

//Delete profile
router.delete("/:id", ensureAuth, providersController.deleteProvider);

module.exports = router;