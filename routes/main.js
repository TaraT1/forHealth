const express = require("express");
const router = express.Router();
const { ensureAuth, ensureGuest } = require("../middleware/auth");

const homeController = require("../controllers/home");
const dashboardController = require("../controllers/dashboard");
const profilesController = require("../controllers/profiles");

//Main Routes
// @desc   Login/Landing Page
// @route
router.get("/", homeController.getIndex);

// @desc    Dashboard
// @route   GET /dashboard
router.get("/dashboard", ensureAuth, dashboardController.getDashboard);
// router.get("/profiles", ensureAuth, profilesController.getProfiles);
// router.get("/providers", providersController.getProviders);

module.exports = router;