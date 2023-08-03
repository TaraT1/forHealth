const express = require("express");
const router = express.Router();
// const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const profilesController = require("../controllers/profiles");
const dashboardController = require("../controllers/dashboard")
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Main Routes
router.get("/", homeController.getIndex);
router.get("/profiles", ensureAuth, profilesController.getProfiles);
// router.get("/providers", providersController.getProviders);
router.get("/dashboard", dashboardController.getDashboard);


// //Routes for user login/signup
// router.get("/login", authController.getLogin);
// router.post("/login", authController.postLogin);
// router.get("/logout", authController.logout);
// router.get("/signup", authController.getSignup);
// router.post("/signup", authController.postSignup);

module.exports = router;