const mongoose = require("mongoose");
const {Task,DataSchema} = require("../models/task");
const validator = require("validator");

const UserSchema = new mongoose.Schema({
    Name:
    {type:String,required:true,
        validate(Name){
       if (validator.isNumeric(Name)) {
              throw new Error("Name cannot contain numbers!!");
            }
                  }
        },
    Age:Number,
    Email: {
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        type: String,
        validate(Email) {
          if (!validator.isEmail(Email)) {
            throw new Error("Invalid email Id!!");
          }
        },
      },
    Profile:String,
    Username:{
      type:String,
       required:true,
       unique: true,
        validate(Username){
            if (validator.isNumeric(Username)) {
                throw new Error("Username cannot contain numbers!! and it should be unique");
              }
        }
    },
    Password:{ 
        type:String,
        required:true,
     },
    Token:String,
   });
   const us=mongoose.model('users', UserSchema);
module.exports.User = mongoose.model('users', UserSchema);
module.exports.UserSchema=UserSchema;