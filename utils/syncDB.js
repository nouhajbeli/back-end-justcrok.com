
const createRecipeModel = require("../models/recette.model");
const createUserModel = require("../models/user.model");

const createCommentaireModel = require("../models/commentaire.model");




const syncCommunityDB = async (dbName) => {
  await createUserModel(dbName);
  
  await createCommentaireModel(dbName);
 
};

const syncRecipeDB = async (dbName, dbUser) => {
    await createRecipeModel(dbName, dbUser);

};
module.exports = { syncCommunityDB, syncRecipeDB  };
