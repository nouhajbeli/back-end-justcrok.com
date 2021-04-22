var dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./utils/connectDB");
const {
  syncCommunityDB,
  syncRecipeDB
} = require("./utils/syncDB");
const databases = require("./config/database");

var http = require("http");
const app = express();
const morgan = require("morgan");

const recetteRoute = require("./routes/recette.route.js");
const userRoute = require("./routes/user.route.js");
require('./config/passportConfig')
// var server = http.createServer(app);
// var io = require('socket.io').listen(server);
const createAdmin = require("./utils/admin");

const passport = require('passport');

(async () => {
 
 

  await connectDB(databases.community);
  await syncCommunityDB(databases.community);
  await createAdmin();
  await connectDB(databases.Recipe);
  await syncRecipeDB(databases.Recipe, databases.community);
 
 
  
})();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());


app.use(passport.initialize())
app.use(morgan("dev"));

app.use("/api/recette", recetteRoute);
app.use("/api/user", userRoute);

// io.on("connection", function (socket) {
//   console.log("user connected");

//   socket.on("chat message", (message) => {
//     console.log(message);
//     io.emit("chat message", message);
//   });
//   socket.on("disconnect", function () {
//     console.log("user disconnected");
//   });
// });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});