const express = require("express")
const router = express.Router()
const upload = require("../middleware/multer")
const healthInfoController = require("../controllers/healthInfo")
const { ensureAuth, ensureGuest } = require("../middleware/auth")

//HealthInfo Routes
//*Retrieve health information for profiles accessible to user
router.get("/", ensureAuth, healthInfoController.getHealthInfoData)

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

module.exports = router;