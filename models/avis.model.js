const { DataTypes } = require("sequelize");

const createAvisModel = (sequelize) => {
  const Avis = sequelize.define(
    "Avis",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      avis: {
        type: DataTypes.STRING,
      }
    
    },
    {
      charset: "utf8",
      dialectOptions: {
        collate: "utf8_general_ci",
      },
      tableName: `${sequelize.config.database}.avis`,
    }
  );

  sequelize.models.User.hasMany(sequelize.models.Avis);
  sequelize.models.Avis.belongsTo(sequelize.models.User);

  (async () => {
    await Avis.sync();
    console.log("avis model was synchronized successfully.");
  })();

  return Avis;
};

module.exports = createAvisModel;