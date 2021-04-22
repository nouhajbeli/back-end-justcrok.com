const router = require("express").Router();
const recetteController = require("../controllers/recette.controller.js");
const multer = require("multer");

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
router.post("/",upload.array("file", 2), recetteController.addRecette);
router.delete("/:id",recetteController.deleteRecetteById)
router.put("/:id",upload.array("file", 2),recetteController.updateRecette)
router.get("/:id", recetteController.getrecetteById);

module.exports = router;