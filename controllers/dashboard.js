const Note = require('../models/Note')
const mongoose = require('mongoose')
const { render } = require("ejs");
const Profile = require("../models/Profile");
const Provider = require("../models/Provider");

module.exports = {

  //get dashboard
  getDashboard: async (req, res) => {
    let perPage = 12
    let page = req.query.page || 1

    const locals = {
      title: "Dashboard",
      description: "A repository for health info"
    };

    try {
      const notes = Note.aggregate([
      { $sort: { updatedAt: -1 } },
      { $match: {user: mongoose.Types.ObjectId(req.user.id) } },
      {
        $project: {
          title: { $substr: ['$title', 0, 30 ] },
          body: { $substr: ['$body', 0, 100 ] },
        },
      }
    ])
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec();

    const count = await Note.count();

    res.render('dashboard/index', {
      userName: req.user.firstName,
      locals,
      notes,
      layout: '../views/layouts/dashboard',
      current: page,
      pages: Math.ceil(count / perPage)
  });
    } catch (err) {
      console.log(err)
    }
  }
}

