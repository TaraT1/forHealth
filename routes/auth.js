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

    async function(accessToken, refreshToken, profile, done) {
        const newUser = {
            googleId: profile.id,
            displayName: profile.displayName,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            profileImage: profile.photos[0].value
        }

        try {
            let user = await User.findOne({ googleId: profile.id});
            if (user) {
                done(null, user);
            } else {
                user = await User.create(newUser);
                done(null, user);
            }
        } catch (error) {
            console.log(`>>>error `, error)
            } 
        })
    );
  
//Google login route
router.get('/auth/google',
  passport.authenticate('google', { scope: ['email', 'profile'] }));

//Retrieve user data
router.get('/google/callback', 
  passport.authenticate('google', { 
    failureRedirect: '/login-failure',
    successRedirect: '/profiles',
    }),
    ),

//router if something goes awry
router.get('/login-failure', (req, res) => {
    res.send('Something went wrong')
});

// Logout 
router.get('/logout', (req, res, next) => {
            req.logout((error) => {
                if(error) {
                    return next(error)}
                    res.redirect('/')
                })
}),

// Persist user data after auth success
passport.serializeUser(function (user, done) {
    done(null, user.id);
});

// Retrieve user data from session
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id)
        done(null, user)
    } catch (err) {
        done(err, null)
    }
})

module.exports = router;