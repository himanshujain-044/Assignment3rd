const express = require("express");
const router = express;
require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const Task = require("../models/task");
const validator = require('validator');
const jwt = require("jsonwebtoken");




module.exports.signup = (req,res) => {
  try {
    console.log(req.body.file)
    if(req.body!=null){
      const user = new User();
          user.Name = req.body.Name;
          user.Age = req.body.Age;
          user.Email = req.body.Email;
          user.Profile = req.body.Profile;
          user.Username = req.body.Username;
      if((validator.isLength(req.body.Password,{min:8})) && (validator.isEmail(req.body.Email))){ 
          user.Profile=req.body.file;    
      user.Password = bcrypt.hashSync(req.body.Password, 10);
          user.save().then(result => {
              console.log(result);
              res.status(201).json({
                message: "User created and uploaded the file successfully"
              });
            })
            .catch(err => {
              console.log(err);
              res.status(500).json({
                error: err
              });
            });
          }
          else{
            res.end("Password lenght should be more than 8 and Email should be in correct format")
          }
        }
          else{
              res.end("Please Enter the required fields");
          }
} catch (error) {
    res.status(500).json({
      Error:error
    })
}
console.log(req.body.file)
console.log(req.file)
   
        }


module.exports.login = (req,res)=>{

  User.findOne({Username:req.body.Username},(err,user)=>{
    if(user==null){
      res.end("Please give the correct Username and Password or user does not exits");
  }
  else{
    bcrypt.compare(req.body.Password, user.Password, function(err, isMatch) {
      console.log("hii")
      if (err) {
        res.status(500).json({
          error: err
        });
      } else if (!isMatch) {
        console.log("Password doesn't match!")
      } else {
        if(err){
          res.status(500).json({
            error: err
          });
        }
          const token = jwt.sign({user},process.env.Sc,{expiresIn:100*60});
          res.json({token:token});
          User.updateOne({_id:user._id},{$set:{Token:token}},(err,data)=>{});
           
    }
      
    })
  }
  })
      
}


module.exports.delete=(req,res)=>{
  User.findOneAndRemove({Username:req.body.Username},(err,user)=>{
                  if(err){
                    res.status(500).json({
                        Error:err
                    })
                  }
                  else{
                    res.write("User successfully deleted\n\n");
                    Task.findOneAndRemove({Username:req.body.Username},(err,user)=>{
                    if(err){
                      res.status(500).json({Error:err});
                    }
                    else
                    res.end("Task also deleted")
                    })
                  }
            });
}
module.exports.logout=(req,res)=>{

  User.updateOne({Username:req.body.Username},{$set:{
    Token:""
}},(err,data)=>{
    if(err)
    res.status(500).json({Error:err});
    else{
        res.end("User successfully logout")
    }
})
}



