const express = require('express');
const router = express.Router(); 
const dashboardController = require('../controllers/dashboard');
//const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const profilesController = require("../controllers/profiles");
const providersController = require("../controllers/providers");
//const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Dashboard Routes
router.get('/dashboard', dashboardController.getDashboard)





module.exports = router;