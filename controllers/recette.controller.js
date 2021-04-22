const recetteService = require("../services/recette.service.js");
const recetteModel= require("../models/recette.model.js");
const { Recipe } = require("../config/database");


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
     console.log("--------------------------->",req.files)
    const reqFiles = [];
    const url = req.protocol + "://" + req.get("host");
    for (var i = 0; i < req.files.length; i++) {
      reqFiles.push(req.files[i].filename);
    }
    console.log(req.files);
    try {
    const Recette = await recetteService.addRecette({
      titre: req.body.titre,
      description: req.body.description,
      image: reqFiles[1],
      pdf: reqFiles[0],
      categorie:req.body.categorie,
      ingredient :req.body.ingredient,

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
      res.send('deleted');
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
    const reqFiles = [];
    const url = req.protocol + "://" + req.get("host");
    for (var i = 0; i < req.files.length; i++) {
      reqFiles.push(req.files[i].filename);
    }
    try {
      const body={    titre: req.body.titre,
      description: req.body.description,
      image: reqFiles[1],
      pdf: reqFiles[0],
      categorie:req.body.categorie,
      ingredient :req.body.ingredient
      }
      const recette = await recetteService.updateRecette(req.params,body);
      res.json(recette);
    } catch (error) {
      // handle error
      next(error)     
      }
  }
};