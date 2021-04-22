const connectDB = async (dbName) => {
    try {
        console.log('--------------------------->',dbName)
      await dbName.authenticate();
      console.log(`${dbName.config.database} connected...`);
    } catch (error) {
      console.log(`${dbName.config.database} connection failed...`);
      console.log(error);
    }
  };
  
  module.exports = connectDB;