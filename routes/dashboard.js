const express = require('express');
const router = express.Router(); 
const dashboardController = require('../controllers/dashboard');
//const authController = require("../controllers/auth");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Dashboard Routes
router.get('/dashboard', ensureAuth, dashboardController.getDashboard)





module.exports = router;