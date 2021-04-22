const createDB = require("../utils/createDB");
const dbs = require("./dbs");
const {
  
  communityDB,
  RecipeDB
} = dbs;
const RecipeDataBase = createDB(RecipeDB);
const communityDataBase = createDB(communityDB);

const databases = {
 Recipe: RecipeDataBase,
  community: communityDataBase,
 

};
module.exports = databases;