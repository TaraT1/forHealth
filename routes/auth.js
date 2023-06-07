const express = require('express');
const router = express.Router(); 
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

//ref: https://www.passportjs.org/packages/passport-google-oauth20/
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://www.example.com/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

module.exports = router;