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
    deleteRecette({id}){
      return Recipe.models.Recipe.destroy({where: { id: id }})
    }
    updateRecette({id},paylod){
      console.log(payload)
      return Recipe.models.Recipe.update(paylod,  {
        where: {
          id: id,
        },
      })
    }
    getRecetteById({id}) {
      return Recipe.models.Recipe.findByPk(id)
    }
    
  })();