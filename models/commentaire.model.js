const { DataTypes } = require("sequelize");

const createCommentaireModel = (sequelize) => {
  const Commentaire = sequelize.define(
    "Commentaire",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      commentaire: {
        type: DataTypes.STRING,
      },
      Id_recette: {
        type: DataTypes.STRING,
      },
    
    },
    {
      charset: "utf8",
      dialectOptions: {
        collate: "utf8_general_ci",
      },
      tableName: `${sequelize.config.database}.commentairesRecette`,
    }
  );

  sequelize.models.User.hasMany(sequelize.models.Commentaire);
  sequelize.models.Commentaire.belongsTo(sequelize.models.User);

  (async () => {
    await Commentaire.sync();
    console.log("Commentaire model was synchronized successfully.");
  })();

  return Commentaire;
};

module.exports = createCommentaireModel;