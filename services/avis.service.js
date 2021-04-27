const { community } = require("../config/database");

module.exports = new (class AvisService {
    constructor() {
    }
  
    getAvis() {
      return community.models.Avis.findAll();
    }
  
    addAvis(payload) {
        
      return community.models.Avis.create(payload);
    }
    deleteAvis({id}){
      return community.models.Avis.destroy({where: { id:id }})
    }
    updateAvis({avis, id, UserId}){
      return community.models.Commentaire.update(  { avis },
        {
          where: {
            UserId: UserId,
            id: id,
          },
        })
    }
   
    
  })();