const router = require("express").Router();
const userController = require("../controllers/user.controller.js");
const jwtHelper=require('../config/jwtHelper')
const { body } = require("express-validator");

router.post("/register",   [
    body("email", "email invalide").trim().isEmail(),
    body("password", "mot de passe invalide").trim().isLength({ min: 3 }),
  ],userController.register);
router.post("/authenticate", userController.authenticate);
router.get('/userProfile',jwtHelper.verifyJwtToken,userController.userProfile)

module.exports = router;