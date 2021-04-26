const { DataTypes } = require('sequelize');

const createRecipeModel = (sequelize, communityBase) => {

var Recipe = sequelize.define('Recipe', {
  Id_recette: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  Description: {
  type: DataTypes.STRING(255),

  },
  Date: {
  type: DataTypes.STRING(255),

  },
  Cuisinier:{
    type: DataTypes.STRING(255),

  },
  temps_Preparation: {
  type: DataTypes.STRING(255),


 
  },
  temps_cuisson: {
  type: DataTypes.STRING(255),
 

  },
  nombre_personne:{
    type: DataTypes.STRING(255),
   

  },
  Ingredient:{
    type: DataTypes.STRING(255)
  },
  Preparation:{
    type:DataTypes.STRING(255)
  },
  Ustensile:{
    type: DataTypes.STRING(255)
  },
  Photo:{
    type: DataTypes.STRING(255)
  },
  video:{
    type: DataTypes.STRING(255)
  },
  },
  {
    charset: 'utf8',
    dialectOptions: {
      collate: 'utf8_general_ci',
    },
    tableName: `${sequelize.config.database}.recettes`,
    hooks: {
      beforeValidate: async function (recette) {
        recette.Id_recette = `${
          sequelize.config.database.split("_")[1]
        }_${Date.now()}`;
      },
    
    },
  } 
);
(async () => {
  try {
    await sequelize.models.Recipe.sync();
    sequelize.models.Recipe.belongsTo(communityBase.models.User, {
      foreignKey: 'UserId',
    });
    communityBase.models.User.hasMany(sequelize.models.Recipe);
    console.log('Recipe model was synchronized successfully.');
  } catch (error) {
    console.log(error);
  }
})();
return Recipe;
}
module.exports = createRecipeModel
