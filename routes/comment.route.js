const router = require("express").Router();
const commentContr = require("../controllers/comment.controller");
const { body } = require("express-validator");
const jwtHelper = require("../config/jwtHelper");

// add comment by user
router.post("/addComment", commentContr.addComment);
router.put("/editComment", commentContr.updateComment);
router.delete("/:Id_recette", commentContr.deleteComment);
// router.put("/deleteCommentAdmin", commentContr.removeComment);
router.get("/:Id_recette", commentContr.getCommentsByRecette);
// router.get("/:userId", commentContr.getCommentsByUser);


module.exports = router;