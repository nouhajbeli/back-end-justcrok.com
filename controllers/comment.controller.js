const commentService = require("../services/comment.service.js");
const { community } = require("../config/database");


module.exports = {
  async getCommentsByRecette(req, res, next) {
    try {
      const recettes= await commentService.getCommentaires();
      res.send(recettes);
    } catch (error) {
      // handle error
    next(error)      
    }
  },

 

  async addComment(req, res, next) {
      
    const { commentaire, UserId,Id_recette} = req.body;
console.log(req.body)
    try {
    const comment = await commentService.addCommentaire(req.body);
      res.send(comment);
    } catch (error) {
      // handle error
      next(error)
    }
  },
  async deleteComment(req, res, next) {
    try {
      const recette = await commentService.deleteRecette(req.params);
      res.send('deleted');
    } catch (error) {
      // handle error
        next(error)   
 }
  },
  async getrecetteById(req, res, next) {
    try {
      const recette = await commentService.getRecetteById(req.params);
      res.send(recette);
    } catch (error) {
      // handle error
          next(error)   
         }
  },
 
  async updateComment(req, res, next) {
  
    try {
    
      const recette = await commentService.updateRecette(req.params,{
        Description: req.body.Description,
        Date: req.body.Date,
        Cuisinier: req.file.Cuisinier,
        temps_Préparation:req.body.temps_Préparation,
        Ingrédient :req.body.Ingrédient,
        temps_cuisson: req.body.temps_cuisson,
        nombre_personne: req.body.nombre_personne,
        Préparation: req.body.Préparation,
        Ustensile: req.body.Ustensile,
        Photo: req.file.filename,
        video: req.body.video,
      });
      res.json(recette);
    } catch (error) {
      // handle error
      next(error)     
      }
  }
};