// const express = require("express");
// const router = express;
// require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const {User,UserSchema} = require("../models/user");
const {Task,DataSchema} = require("../models/task");
const validator = require('validator');
const jwt = require("jsonwebtoken");
module.exports.signup = async (req,res) => {
 
    try{
    if(req.body!=null && req.body.Name!=null){
          const user = new User();
          user.Name = req.body.Name;
          user.Age = req.body.Age;
          user.Email = req.body.Email;
          user.Profile = req.body.Profile;
          user.Username = req.body.Username;
          user._id=mongoose.Types.ObjectId();
          if((validator.isLength(req.body.Password,{min:8})) && (validator.isEmail(req.body.Email))){ 
          let file="";
          if(req.file!=null){
          user.Profile=req.file.path; 
          file="You provided profile"
                            }
         else
         file="Profile has been not uploaded because you don't provide it"
       

        user.Password = bcrypt.hashSync(req.body.Password, 10);
        const u= await User.findOne({Email:req.body.Email})
        if(u==null){
              await  user.save();
              res.status(400).json({
              Username:"User Created Successfully",
              File:file })    
                   }

         else{
             res.status(400).json({Email:"Already User Exits with this Email"});
             }
          }
          else{
            res.status(400).json({Password:"Password lenght should be more than 7 ",Email: "Email should be in correct format"})
              }
        }
          else{
              res.status(400).json({Name:"Please Enter complusary field like Username,Email,password and Name"});
              }
        }
        catch(err){
          res.status(400).json({
            Username:"This username already exits",
             Name:"Name cannot contain number only and contain at least one character!" 
                               })
                 }

}
   
        


module.exports.login = (req,res)=>{

    User.findOne({Username:req.body.Username},(err,user)=>{
       if(user==null){
      res.status(400).json({UserNamePassword:"Please give the correct Username and Password or user does not exits"});
                     }
       else{
    bcrypt.compare(req.body.Password, user.Password, function(err, isMatch) {
      if (err) {
          res.status(500).json({
          error: err
        });
               } 
      else if (!isMatch) {
        console.log("Password doesn't match!")
      } 
      else {
        if(err){
          res.status(500).json({
            error: err
          });
              }
          const token = jwt.sign({user},process.env.Sc,{expiresIn:30*60});
          res.status(200).json({token:token});
          User.updateOne({_id:user._id},{$set:{Token:token}},(err,data)=>{});
           
    }
      
    })
  }
  })
}


module.exports.delete= async (req,res)=>{
  try {
    await Task.deleteMany({ Username: req.Username });
    await User.deleteOne({ Username: req.Username });
   res.status(200).json({User:"User deleted successfully...",Task:"Task also deleted successfully..."});
  } catch (err) {
    res.status(500).json({Error:"User or Task is not deleted",Error:err});
  }
}



module.exports.logout= async (req,res)=>{
      User.updateOne({Username:req.Username},{$set:{
    Token:""
}},(err,data)=>{
    if(err)
    res.status(500).json({Error:err});
    else{
        res.status(200).json({Logout:"User successfully logout"})
    }
})
}

module.exports.getuser= async (req,res)=>{
  try{
     const user = await User.findOne({Username:req.Username});
     res.status(200).json({User:user})
    }
    catch(err){
      res.status(500).json({Error:err});
    }
}

module.exports.getalluser = async (req,res)=>{
  try{
       const alluser = await User.find().select("Name Username Email");
       res.status(200).json({AllUser:alluser})
  }
  catch(err){
    res.status(400).json({Error:err.message})
  }
}



