const { render } = require("ejs");
const Profile = require("../models/Profile");
const Provider = require("../models/Provider");

//get dashboard
module.exports = {
  getDashboard: (req, res) => {
    res.render('dashboard/index', {
      layout: '../views/layouts/dashboard'
    })
  }
}