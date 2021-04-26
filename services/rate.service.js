const { community } = require("../config/database");

module.exports = new (class RateService {
    constructor() {
    }
  
    getrates({Id_recette}) {
      return community.models.Rate.findAll({where: {
        Id_recette: Id_recette
      },});
    }
  
    addRate(payload) {
        
      return community.models.Rate.create(payload);
    }
    updateRate({rates, id, Id_recette, UserId}){
        return community.models.Rate.update(  { rates },
          {
            where: {
              Id_recette: Id_recette,
              UserId: UserId,
              id: id,
            },
          })
      }
  
   
  })();