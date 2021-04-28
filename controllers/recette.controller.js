const recetteService = require("../services/recette.service.js");
const { Recipe } = require("../config/database");

const { validationResult } = require("express-validator");

module.exports = {
  async getRecettes(req, res, next) {
    try {
      const recettes= await recetteService.getRecettes();
      res.send(recettes);
    } catch (error) {
      // handle error
    next(error)      
    }
  },

 

  async addRecette(req, res, next) {
   
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const error = new Error("Validation failed");
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
      }
    const Recette = await recetteService.addRecette({
      Description: req.body.Description,
      Date: req.body.Date,
      Cuisinier: req.body.Cuisinier,
      temps_Preparation:req.body.temps_Preparation,
      Ingredient :req.body.Ingredient,
      temps_cuisson: req.body.temps_cuisson,
      nombre_personne: req.body.nombre_personne,
      Preparation: req.body.Preparation,
      Ustensile: req.body.Ustensile,
      Photo: req.file.filename,
      video: req.body.video,
    });

    
      res.send(Recette);
    } catch (error) {
      // handle error
      next(error)
    }
  },
  async deleteRecetteById(req, res, next) {
    try {
      const recette = await recetteService.deleteRecette(req.params);
      res.json(recette);
    } catch (error) {
      // handle error
        next(error)   
 }
  },
  async getrecetteById(req, res, next) {
    try {
      const recette = await recetteService.getRecetteById(req.params);
      res.send(recette);
    } catch (error) {
      // handle error
          next(error)   
         }
  },
  async updateRecette(req, res, next) {
  
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const error = new Error("Validation failed");
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
      }
      const recette = await recetteService.updateRecette(req.params,{
        Description: req.body.Description,
        Date: req.body.Date,
        temps_Preparation:req.body.temps_Preparation,
        Ingredient :req.body.Ingredient,
        temps_cuisson: req.body.temps_cuisson,
        nombre_personne: req.body.nombre_personne,
        Preparation: req.body.Preparation,
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