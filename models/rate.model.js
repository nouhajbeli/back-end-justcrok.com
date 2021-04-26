const { DataTypes } = require("sequelize");

const createRateModel = (sequelize) => {
  const Rate = sequelize.define(
    "Rate",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      rates: {
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
      tableName: `${sequelize.config.database}.Rates`,
    }
  );

  sequelize.models.User.hasMany(sequelize.models.Rate);
  sequelize.models.Rate.belongsTo(sequelize.models.User);

  (async () => {
    await Rate.sync();
    console.log("Rate model was synchronized successfully.");
  })();

  return Rate;
};

module.exports = createRateModel;