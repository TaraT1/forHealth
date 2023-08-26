// Maybe delete. Keep main.js
const express = require('express');
const router = express.Router(); 
const dashboardController = require('../controllers/dashboard');
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Dashboard Routes
router.get('/dashboard', ensureAuth, dashboardController.getDashboard)





module.exports = router;