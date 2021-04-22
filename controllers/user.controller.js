const { authenticate } = require("passport");
const { community } = require("../config/database");

const userService = require("../services/user.service.js");
const passport=require('passport')
const User= require("../models/user.model.js");
const _=require('lodash');
const { validationResult } = require("express-validator");
const jwt=require('jsonwebtoken')

module.exports = {
  
    async register(req, res, next) {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          const error = new Error("Validation failed");
          error.statusCode = 422;
          error.data = errors.array();
          throw error;
        }else {
        
          const existedUser = await  community.models.User.findOne(
            { where: {
                email: req.body.email
              }
            });
          if (existedUser) {
            const error = Error("email already exists");
            (error.statusCode = 409),
              (error.data = [{ param: "email", msg: "email existe" }]);
            throw error;
          }else {
            const user= await userService.adduser(req.body);
            res.send(user);
          }
        }
        } catch (error) {
          // res.status(500).send(error);
          next(error)
        }  
 },

         async authenticate (req, res, next){
          passport.authenticate('local',(err,user,info)=>{
            if(err) 
            return res.status(400).json(err);
            else if(user){
            return res.status(200).json({"token":jwt.sign({ id: user.id },'SECRET#123', {
              expiresIn: '24h' // expires in 24 hours
            })})
            }
            else return res.status(404).json(info)
          })(req,res)

         },


         async userProfile(req, res, next){
          const user = await  community.models.User.findOne(
            { where: {
              id: req.id
            }
            });
           console.log('user',req.id)
         
        
              if (!user){
              return res.status(404).json({status:false,message:'User recors not found'})
               } else{
                return res.status(200).json({status:true,user:_.pick(user,['fullName','email'])})
               }
            
         }
   
  };