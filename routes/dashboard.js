const express = require('express');
const router = express.Router(); 
const dashboardController = require('../controllers/dashboard');
const {isLoggedIn} = require('../middleware/checkAuth');
//const authController = require("../controllers/auth");
//const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Dashboard Routes
router.get('/dashboard', isLoggedIn, dashboardController.getDashboard)





module.exports = router;