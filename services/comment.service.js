const { community } = require("../config/database");

module.exports = new (class CommentService {
    constructor() {
    }
  
    getCommentaires() {
      return community.models.Commentaire.findAll();
    }
  
    addCommentaire(payload) {
        
      return community.models.Commentaire.create(payload);
    }
    deleteCommentaire({Id_recette}){
      return community.models.Commentaire.destroy({where: { Id_recette: Id_recette }})
    }
    updateCommentaire({Id_recette},payload){
      return community.models.Commentaire.update(payload,  {
        where: {
          Id_recette: Id_recette,
        },
      })
    }
    getCommentaireById({Id_recette}) {
      return community.models.Commentaire.findByPk(Id_recette)
    }
    
  })();