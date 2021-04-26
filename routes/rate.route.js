const router = require("express").Router();
const rateContr = require("../controllers/rate.controller");
const { body } = require("express-validator");
const jwtHelper = require("../config/jwtHelper");

// add comment by user
router.post("/addrate", rateContr.addRate);
router.get("/:Id_recette", rateContr.getratesById);
router.put("/editrate", rateContr.updateRate);
router.get("/",rateContr.getAllRates)

module.exports = router;