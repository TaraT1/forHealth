const express = require('express');
const router = express.Router(); 
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User')

//https://www.passportjs.org/packages/passport-google-oauth20/ c.f. strategy
//https://console.developers.google.com/
passport.use(
    new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
  },

async function(accessToken, refreshToken, userProfile, done) {
    const newUser = {
        googleId: userProfile.id,
        displayName: userProfile.displayName,
        firstName: userProfile.name.givenName,
        lastName: userProfile.name.familyName,
        profileImage: userProfile.photos[0].value
    }
    try {
        let user = await User.findOne({ googleId: userProfile.id});
        if (user) {
            done(null, user);
        } else {
            user = await User.create(newUser);
            done(null, user);
        }
    } catch (error) {
        console.log(error)
    }
    }
));
  
//   function(accessToken, refreshToken, profile, cb) {
//     User.findOrCreate({ googleId: profile.id }, function (err, user) {
//       return cb(err, user);
//     });
//   }

//Google login route
router.get('/auth/google',
  passport.authenticate('google', { scope: ['email', 'profile'] }));

//Retrieve user data
router.get('/google/callback', 
  passport.authenticate('google', { 
    failureRedirect: '/login-failure',
    successRedirect: '/dashboard' })
);
//router if something goes awry
router.get('/login-failure', (req, res) => {
    res.send('Something went wrong')
});

// Persist user data after auth success
passport.serializeUser(function (user, done) {
    done(null, user.id);
});

// Retrieve user data from session
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id); 
        done(null, user);
    } catch (err) {
        done(err,null);
    }
});

module.exports = router;