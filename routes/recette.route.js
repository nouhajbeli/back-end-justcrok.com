const router = require("express").Router();
const recetteController = require("../controllers/recette.controller.js");
const multer = require("multer");
const { body } = require("express-validator");

router.get("/", recetteController.getRecettes);
// const DIR = "../front-justcrock.com/src/assets/uploads/recettes/";
var name_file;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
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
router.post("/",upload.single("Photo"), recetteController.addRecette);
router.delete("/:Id_recette",recetteController.deleteRecetteById)
router.put("/:Id_recette",upload.single("Photo"),recetteController.updateRecette)
router.get("/:Id_recette", recetteController.getrecetteById);

module.exports = router;