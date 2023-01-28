const express = require("express");
const router = express.Router();
//const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const profilesController = require("../controllers/profiles");
//const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Main Routes
router.get("/", homeController.getIndex);
router.get("/profiles", profilesController.getProfiles);
// router.get("/profiles", ensureAuth, profilesController.getProfiles);

//Routes for user login/signup
// router.get("/login", authController.getLogin);
// router.post("/login", authController.postLogin);
// router.get("/logout", authController.logout);
// router.get("/signup", authController.getSignup);
// router.post("/signup", authController.postSignup);

module.exports = router;