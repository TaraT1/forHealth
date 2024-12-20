//notes is HealthInfo.notes[{}]
const path = require("path");
const { render } = require("ejs");
const User = require("../models/User");
const Profile = require("../models/Profile");
const Provider = require("../models/Provider");
const HealthInfo = require("../models/HealthInfo");
const { trusted } = require("mongoose");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

const mongoose = require('mongoose')

module.exports = {
    
  // @desc Create note route
  // @route POST /healthInfo/:id/note
  createNote: async (req, res) => {
    try {
      const healthInfo = await HealthInfo.findById(req.params.id)
      healthInfo.notes.push({
        noteTitle: req.body.noteTitle,
        noteDescription: req.body.noteDescription
      })
      await healthInfo.save()
      res.redirect(`/healthInfo`)
    } catch (err) {
      res.status(500).send(err)
    }
  },
//   renderNewNote: 


     /* 
      const newNote = {
        noteTitle: req.body.noteTitle,
        noteDescription: req.body.noteDescription,
      }

      HealthInfo.notes.push(newNote) //push new note into notes array
      await HealthInfo.save();
      */
      // req.body.notes = req.body.notes || []
      // req.body.providers = Array.isArray(req.body.providers)
      //   ? req.body.providers
      //   : [req.body.providers];

      /*
      console.log(">>>> New health info! Whomp");
      res.redirect(`/healthInfo/${req.params.id}`);
    } catch (err) {
      console.log(err);
      res.redirect(`/healthInfo`)
    }
  },
  */
}
