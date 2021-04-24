const router = require("express").Router();
const userController = require("../controllers/user.controller.js");
const jwtHelper=require('../config/jwtHelper')
const { body } = require("express-validator");
const crypto = require("crypto");

router.post("/register",   [
    body("email", "email invalide").trim().isEmail(),
    body("password", "mot de passe invalide").trim().isLength({ min: 3 }),
  ],userController.register);
router.post("/authenticate", userController.authenticate);
router.get('/userProfile',jwtHelper.verifyJwtToken,userController.userProfile)
// reset password
router.post("/reset-password", userController.resetPassword);
// new password
router.post("/newpassword/:token", userController.newpassword);
router.get("/userProfileId/:id", jwtHelper.verifyJwtToken, userController.findUser);
router.get("/getUsers",userController.getAllUsers);

module.exports = router;