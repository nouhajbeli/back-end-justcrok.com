const router = require("express").Router();
const recetteController = require("../controllers/recette.controller.js");
const multer = require("multer");
const { body } = require("express-validator");

router.get("/", recetteController.getRecettes);
const DIR = "../front-end/src/assets/uploads/recettes/";
var name_file;
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");  },
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
router.post("/",upload.single("file"), recetteController.addRecette);
router.delete("/:Id_recette",recetteController.deleteRecetteById)
router.put("/:Id_recette",upload.single("file"),recetteController.updateRecette)
router.get("/:Id_recette", recetteController.getrecetteById);

module.exports = router;