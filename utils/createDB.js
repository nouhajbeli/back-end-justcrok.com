const { Sequelize } = require('sequelize');
const createDB = (data) => {
  console.log('============>',data)
  const { database, username, password, host, dialect } = data;
  let newDataBaseConnection = new Sequelize(database, username, password, {
    dialect,
    host,
  });
  return newDataBaseConnection;
};
module.exports = createDB;