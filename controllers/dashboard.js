const mongoose = require('mongoose')
const { render } = require("ejs");
const Note = require('../models/Note')
const Profile = require("../models/Profile");
const Provider = require("../models/Provider");

module.exports = {

  //get dashboard
  getDashboard: async (req, res) => {
    const locals = {
      title: "Dashboard",
      description: "A repository for health info"
    }

    try {
      const notes = await Note.find({})

      res.render('dashboard/index', {
        locals,
        notes,
        layout: '../views/layouts/dashboard'
    })
    } catch (err) {
      console.log(err)
    }
  }
}

