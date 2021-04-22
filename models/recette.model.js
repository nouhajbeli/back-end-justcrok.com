const { DataTypes } = require('sequelize');

const createRecipeModel = (sequelize, communityBase) => {

var Recipe = sequelize.define('Recipe', {
  id: {
      type: DataTypes.BIGINT,
      field: 'id',
      primaryKey: true,
  autoIncrement: true,
  allowNull: false,
  },
  titre: {
  type: DataTypes.STRING(255),

  },
  image: {
  type: DataTypes.STRING(255),

  },
  pdf:{
    type: DataTypes.STRING(255),

  },
  ingredient: {
  type: DataTypes.STRING(255),


 
  },
  description: {
  type: DataTypes.STRING(255),
 

  },
  categorie:{
    type: DataTypes.STRING(255),
   

  }
  },
  {
    charset: 'utf8',
    dialectOptions: {
      collate: 'utf8_general_ci',
    },
    tableName: `${sequelize.config.database}.recettes`,
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
