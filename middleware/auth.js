 // Checks for authentication /user logged in
module.exports = {
  ensureAuth: function (req, res, next) {
    if(req.isAuthenticated()) {
      return next()
      } else {
        res.redirect('/')
        return res.status(401).send('Access Denied')
        }
    },

  ensureGuest: function (req, res, next) {
    if(!req.isAuthenticated()) {
      return next()
      } else {
        res.redirect('/dashboard')
      }
    }
}