const express = require('express');
const router = express.Router(); 
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

//https://www.passportjs.org/packages/passport-google-oauth20/ c.f. strategy
//https://console.developers.google.com/
passport.use(
    new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
  },

function(accessToken, refreshToken, profile, cb) {
    console.log(profile);
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


module.exports = router;