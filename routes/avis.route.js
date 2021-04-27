const router = require("express").Router();
const avisContr = require("../controllers/avis.controller");
const { body } = require("express-validator");
const jwtHelper = require("../config/jwtHelper");

// add comment by user
router.post("/addAvis", avisContr.addAvis);
router.put("/editAvis", avisContr.updateAvis);
router.delete("/:id", avisContr.deleteAvis);
// router.put("/deleteCommentAdmin", commentContr.removeComment);
router.get("/", avisContr.getAvis);
// router.get("/:userId", commentContr.getCommentsByUser);


module.exports = router;