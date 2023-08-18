 // Checks for authentication /user logged in
module.exports = {
  //bub
  ensureAuth: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.redirect("/");
      return res.status(401).send('Access Denied')
    }
  },
// if user authenticated, avoid login page and redirect to profiles; if not authenticated, access login
  ensureGuest: function (req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    } else {
      res.redirect("/profiles");
    }
  },
};

//*** raddy checkAuth
// module.exports = {
//     isLoggedIn: function (req, res, next) {
//         if(req.user) {
//             next();
//         } else {
//             return res.status(401).send('Access Denied')
//         }
//     }
// }

// At storybooks 1:05:09, simply write:
// if(req.isAuthenticated()){
//     return next();
// }