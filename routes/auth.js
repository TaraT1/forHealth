const express = require('express');
const router = express.Router(); 
const passport = require('passport');


//https://www.passportjs.org/packages/passport-google-oauth20/ c.f. strategy
//https://console.developers.google.com/


// @desc    Auth with Google
// @route   GET /auth/google
//Google Login Route -- /auth/google; /google since /routes/auth
router.get('/auth/google',
  passport.authenticate('google', { scope: ['email', 'profile'] })
);

// @desc    Google auth callback
// @route   GET //google/callback
//Retrieve user data -- /google/callback
router.get('/google/callback', 
  passport.authenticate('google', { 
    failureRedirect: '/login-failure',
    successRedirect: '/dashboard', // To dashboard after authentication
    }),
),

//Route if something goes awry -- /login-failure
router.get('/login-failure', (req, res) => {
    res.send('Something went wrong')
});

// @desc    Logout user
// @route   /auth/logout
// Destroy user session -- /auth/logout
router.get('/auth/logout', (req, res) => {
    req.session.destroy(error => {
        if(error) {
            console.log(error)
            res.send('Error logging out')
        } else {
            res.redirect('/')
        }
    })
}) 
 
//  // @desc    Logout user
// // @route   /auth/logout
// // Logout (Traversy -- /auth/logout
// router.get('/logout', (req, res, next) => {
//     req.logout((error) => {
//         if(error) {
//             return next(error)}
//             res.redirect('/')
//     })
// }),


module.exports = router;