const passport=require('passport');
const localStrategy=require('passport-local').Strategy;
const User= require("../models/user.model.js");
const bcrypt=require('bcryptjs')
const { community } = require("../config/database");


passport.use(new localStrategy({
    usernameField:'email'
},function(username, password, done){
  community.models.User.findOne({
      where: {
        email: username
      }
    }).then(function(user, err){
      if (err) { return done(err); }
      if (!user) { 
        return done(null,false,{message:'Email is not registered'})}
        if (!bcrypt.compareSync(password, user.password)){ 
            return done(null,false, {message:'wrong password'})}
            return done(null,user)
        })
  }))