const { community } = require("../config/database");

module.exports = new (class CommentService {
    constructor() {
    }
  
    getCommentaires({Id_recette}) {
      return community.models.Commentaire.findAll({where: {
        Id_recette: Id_recette
      },});
    }
  
    addCommentaire(payload) {
        
      return community.models.Commentaire.create(payload);
    }
    deleteCommentaire({id}){
      return community.models.Commentaire.destroy({where: { id:id }})
    }
    updateCommentaire({commentaire, id, Id_recette, UserId}){
      return community.models.Commentaire.update(  { commentaire },
        {
          where: {
            Id_recette: Id_recette,
            UserId: UserId,
            id: id,
          },
        })
    }
    getCommentaireById({Id_recette}) {
      return community.models.Commentaire.findByPk(Id_recette)
    }
    
  })();