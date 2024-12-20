const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer")
const notesController = require("../controllers/notes");
const { ensureAuth, ensureGuest } = require("../middleware/auth"); //elimiate ensureGuest

//Note Routes
//Retrieve all notes
// router.get("/", ensureAuth, notesController.getNotes)

//Create/update note route form
// router.get("/new", ensureAuth, notesController.renderNewNote)

//Create note route to healthInfo record
router.post("/healthInfo/:id/note", notesController.createNote)

//Update note

//Delete note

module.exports = router;
