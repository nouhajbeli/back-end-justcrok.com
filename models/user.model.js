const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')


const { DataTypes } = require("sequelize");

const createUserModel = (sequelize) => {
const User = sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    fullName: {
      type: DataTypes.STRING,
    },
    email: {
        type:DataTypes.STRING,
        validate:{
            notEmpty:{
                args:true,
                msg:"Email-id required"
            },
            isEmail:{
                args:true,
                msg:'Valid email-id required'
            }
        },
       unique: { msg: 'Email address already in use!' }
      },
      password: {
        type: DataTypes.STRING,
      },
      resetToken:{
        type: DataTypes.STRING
      },
      expireToken:{
        type: DataTypes.STRING
      }
      ,
      role:{
        type: DataTypes.STRING
      },
      createdAt: {
          type: DataTypes.DATE,
          defaultValue: sequelize.fn('now'),

      },
      imageUrl:{
        type: DataTypes.STRING,
        defaultValue: "https://jcback.justcrok.com/uploads/images/1024px-OOjs_UI_icon_userAvatar-constructive.svg.png"

      },
      status: {
        type: DataTypes.STRING,
        defaultValue: "active",
      },
      updatedAt: {
          type: DataTypes.DATE,
          defaultValue: sequelize.fn('now'),

      },

  },
    
  {
    charset: "utf8",
    dialectOptions: {
      collate: "utf8_general_ci",
    },
    tableName: `${sequelize.config.database}.users`,
  }
       
        
    );
 
  


User.beforeCreate((user, options) => {

    return bcrypt.hash(user.password, 10)
        .then(hash => {
            user.password = hash;
        })
        .catch(err => { 
            throw new Error(); 
        });
});
(async () => {
    await User.sync();
    console.log("User model was synchronized successfully.");
  })();

  return User;
}

module.exports = createUserModel;
