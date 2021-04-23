const recetteService = require("../services/recette.service.js");
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
    //  console.log("--------------------------->",req.files)
    // const reqFiles = [];
    // const url = req.protocol + "://" + req.get("host");
    // for (var i = 0; i < req.files.length; i++) {
    //   reqFiles.push(req.files[i].filename);
    // }
    // console.log(req.files);
    try {
    const Recette = await recetteService.addRecette({
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
  
    try {
    
      const recette = await recetteService.updateRecette(req.params,{
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