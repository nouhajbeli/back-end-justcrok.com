const router = require("express").Router();
const commentContr = require("../controllers/comment.controller");
const { body } = require("express-validator");
const jwtHelper = require("../config/jwtHelper");

// add comment by user
router.post("/addComment", commentContr.addComment);
router.put("/editComment", commentContr.updateComment);
router.put("/deleteComment", commentContr.deleteComment);
// router.put("/deleteCommentAdmin", commentContr.removeComment);
router.get("/:mosqueId/:code", commentContr.getCommentsByRecette);
// router.get("/:userId", commentContr.getCommentsByUser);


module.exports = router;