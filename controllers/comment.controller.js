const commentService = require("../services/comment.service.js");
const { community } = require("../config/database");
const { validationResult } = require("express-validator");


module.exports = {
  async getCommentsByRecette(req, res, next) {

    try {
        const { Id_recette } = req.params;
      const recettes= await commentService.getCommentaires(req.params);
      res.send(recettes);
    } catch (error) {
      // handle error
    next(error)      
    }
  },

 

  async addComment(req, res, next) {
      
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          const error = new Error("Validation failed");
          error.statusCode = 422;
          error.data = errors.array();
          throw error;
        }
        const { commentaire, UserId,Id_recette} = req.body;
    const comment = await commentService.addCommentaire(req.body);
      res.send(comment);
    } catch (error) {
      // handle error
      next(error)
    }
  },
  async deleteComment(req, res, next) {
    try {
      const comment = await commentService.deleteCommentaire(req.params);
      res.send(comment);
    } catch (error) {
      // handle error
        next(error)   
 }
  },

 
  async updateComment(req, res, next) {

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          const error = new Error("Validation failed");
          error.statusCode = 422;
          error.data = errors.array();
          throw error;
        }
        const { commentaire, id, Id_recette, UserId } = req.body;
      const comment = await commentService.updateCommentaire(req.body);
      res.json(comment);
    } catch (error) {
      // handle error
      next(error)     
      }
  }
};