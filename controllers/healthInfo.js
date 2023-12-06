const path = require("path")
const {render} = require("ejs")
const User = require("../models/User")
const Profile = require("../models/Profile")
const { trusted } = require("mongoose")
const { ensureAuth, ensureGuest } = require ("../middleware/auth")

module.exports = {
// @desc Show healthInfo for authorized profiles OR =>> show profiles to select profile
// @route GET /profiles/
getHealthInfo: async (req, res) => {
    try {
        const profiles = await Profile.find( {user: req.user.id} )
        // !profile add profile
        res.render("profiles/profiles", { profiles: profiles})
    }
    catch (err){
        console.log(">>>> ", err)
    }
},

// Add health information 
// @desc Show add page
// @route GET /healthInfo/new ***TODO
renderNewHealthInfo: async (req, res) => {

},

// @desc Create healthInfo route
// @route POST /healthInfo
createHealthInfo: async (req, res) => {

},

// @desc Get healthInfo (update: get/show, view/edit, update)
// @route GET [[/profiles/:id/healthInfo]]
getHealthInfo: async (req, res) => {

},

// @desc Update db
// @route POST /update/:id
updateHealthInfo: async (req, res) => {

},

// @desc delete healthinfo
// @route DELETE profiles/:id/healthInfo
deleteHealthInfo: async (req, res) => {

},

}