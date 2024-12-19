const express = require("express")
const router = express.Router()
const upload = require("../middleware/multer")
const healthInfoController = require("../controllers/healthInfo")
const { ensureAuth, ensureGuest } = require("../middleware/auth")

//HealthInfo Routes
//*Retrieve health information for profiles accessible to user
router.get("/", ensureAuth, healthInfoController.getHealthInfoRecords)

//*Create healthInfo route
//new healthInfo to render form
router.get("/new", ensureAuth, healthInfoController.renderNewHealthInfo)

//*Create healthInfo route
router.post("/", ensureAuth, upload.single('file'), healthInfoController.createHealthInfo)

//*update healthInfo get/show, view/edit, update
//Show healthInfo
router.get("/:id", ensureAuth, healthInfoController.getHealthInfo)

//Update db
router.post("/update/:id", ensureAuth, healthInfoController.updateHealthInfo)

//*Delete healthInfo
router.delete("/:id", ensureAuth, healthInfoController.deleteHealthInfo)

/*
//Note Route for healthInfo
//Get all notes for healthInfo record
// router.get("/note", healthInfoController.getHealthInfoNotes )

//Show note (get/show, view/edit, update)
router.get("/:id/note", ensureAuth, healthInfoController.getNote )

//Create note
router.post("/:id/note", ensureAuth, healthInfoController.createNote)

//Update note
// router.post("/update/:id", ensureAuth, healthInfoController.updateNote)


//Delete note
// router.delete("/:id", ensureAuth, healthInfoController.deleteNote)
*/
module.exports = router;