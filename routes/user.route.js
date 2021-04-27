const router = require("express").Router();
const userController = require("../controllers/user.controller.js");
const jwtHelper=require('../config/jwtHelper')
const { body } = require("express-validator");
const multer = require("multer");
const crypto = require("crypto");
const DIR = "../front-justcrock.com/src/assets/uploads/recettes/";
var name_file;
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    name_file = fileName;
    cb(null, fileName);
  }
});

var upload = multer({
    storage: storage,
    limits: {
      fileSize: 100024 * 1024 * 5
    },
    fileFilter: (req, file, cb) => {
      cb(null, true);
    }
  });
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
router.put("/editimage",upload.single("file"),userController.editImage);

module.exports = router;