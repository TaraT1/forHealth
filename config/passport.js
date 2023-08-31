//Separate passport config from auth route
 
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose')
const User = require('../models/User')

module.exports = function (passport) {
    passport.use(
        new GoogleStrategy({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },

        async function(accessToken, refreshToken, profile, done) { // profile from google
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
                console.log(error)
                } 
            })
        );

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
}