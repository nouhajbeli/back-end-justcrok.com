const dbs = {
    RecipeDB: {
      database: process.env.rc_DATABASE,
      username: process.env.rc_USERNAMEDB,
      password: process.env.rc_PASSWORD,
      host: process.env.rc_HOST,
      dialect: "mysql",
      PORT: 3306   

    },

    communityDB: {
      database: process.env.cm_DATABASE,
      username: process.env.cm_USERNAMEDB,
      password: process.env.cm_PASSWORD,
      host: process.env.cm_HOST,
      dialect: "mysql",
      PORT: 3306   

    },
  

  };
  module.exports = dbs;