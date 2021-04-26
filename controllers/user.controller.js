const { authenticate } = require("passport");
const { community } = require("../config/database");
const crypto = require("crypto");
const bcrypt=require('bcryptjs')

const userService = require("../services/user.service.js");
const passport=require('passport')
const _=require('lodash');
const { validationResult } = require("express-validator");
const jwt=require('jsonwebtoken')
const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  host: process.env.host,
  port: 465, 
  secure: true,
  auth: {
  user: process.env.justcrokmail,
  pass: process.env.pass
  }
})

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
              return res
                .status(409)
                .json({ error: "email already exists" });
            
          }else {
            const user= await userService.adduser(req.body);
            transporter
            .sendMail({
              to: user.email,
              from: process.env.justcrokmail,
              subject: "signup success",
              html: "<h1>welcome to justcrok</h1>",
            })
            .then(console.log("Success!"))
            .catch((err) => console.log(err));
               res.send(user);
          }
        }
        } catch (error) {
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
                return res.status(200).json({status:true,user:_.pick(user,['id','fullName','email'])})
               }    
         },
         async newpassword(req,res,next){
          const newPassword = req.body.password;
          const sentToken = req.params.token;
          await community.models.User.findOne({ where: { resetToken: sentToken } })
            .then((user) => {
              if (!user) {
                return res.status(422).json({ error: "Try again session expired" });
              }
              bcrypt.hash(newPassword, 12).then((hashedpassword) => {
                user.password = hashedpassword;
                user.resetToken = undefined;
                user.expireToken = undefined;
                user.save().then((saveduser) => {
                  res.json({ message: "password updated success" });
                });
              });
            })
            .catch((err) => {
              next(err)
            });
         },
        async resetPassword(req,res,next){
          try {
            crypto.randomBytes(32, (err, buffer) => {
              if (err) {
                console.log(err);
              }
              const token = buffer.toString("hex");
              community.models.User.findOne({
                where: {
                  email: req.body.email,
                },
              }).then((user) => {
                if (!user) {
                  return res
                    .status(422)
                    .json({ error: "User dont exists with that email" });
                }
                user.resetToken = token;
                user.expireToken = Date.now() + 3600000;
                user
                  .save()
                  .then((result) => {
                    console.log(token);
                    transporter.sendMail({
                      to: user.email,
                      from: process.env.justcrokmail,
                      subject: "password reset",
                      html: `
                        <p>You requested for password reset</p>
                        <h5>click in this <a href="http://localhost:4200/newpassword/${token}">link</a> to reset password</h5>
                        `,
                    });
                    res.json({ message: "check your email" });
                  })
                  .catch((err) => next(err));
              });
            });
          } catch (error) {
            next(error);
          
        }
      },
     async findUser  (req, res, next)  {
        try {
          const { id } = req.params;
          const foundUser = await community.models.User.findByPk(id);
          if (!foundUser) {
            const error = new Error("USER not found");
            error.statusCode = 404;
            throw error;
          }
          res.status(200).json(foundUser);
        } catch (error) {
          next(error);
        }
      },
      async getAllUsers(req,res,next){
        try {
          const users = await community.models.User.findAll();
          if (users.length === 0) {
            const error = new Error("users not found");
            error.statusCode = 404;
            throw error;
          }
          res.status(200).json(users);
        } catch (error) {
          // console.log(error)
          next(error);
        }
      }
   
  };