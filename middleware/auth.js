 // Checks for authentication /user logged in
module.exports = {
  //bub
  ensureAuth: function (req, res, next) {
    if (req.user) { //isAuthenticated bub
      return next();
    } else {
      res.redirect("/");
      return res.status(401).send('Access Denied')
    }
  },
  ensureGuest: function (req, res, next) {
    if (!req.user) {
      return next();
    } else {
      res.redirect("/");
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