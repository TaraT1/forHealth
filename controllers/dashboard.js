
module.exports = {
  getDashboard: (req, res) => {
    res.render('dashboard/index', {
      layout: '../views/layouts/dashboard'
    })
  }
}