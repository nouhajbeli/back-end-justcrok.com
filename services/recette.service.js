const { Recipe } = require("../config/database");

module.exports = new (class RecetteService {
    constructor() {
    }
  
    getRecettes() {
      return Recipe.models.Recipe.findAll();
    }
  
    addRecette(payload) {
      return Recipe.models.Recipe.create(payload);
    }
    deleteRecette({Id_recette}){
      return Recipe.models.Recipe.destroy({where: { Id_recette: Id_recette }})
    }
    updateRecette({Id_recette},payload){
      console.log(payload)
      return Recipe.models.Recipe.update(payload,  {
        where: {
          Id_recette: Id_recette,
        },
      })
    }
    getRecetteById({Id_recette}) {
      return Recipe.models.Recipe.findByPk(Id_recette)
    }
    
  })();