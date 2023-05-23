module.exports = {
  getIndex: (req, res) => {
    res.render('index', {
      layout: '../views/layouts/landing'
    })
  }
}
