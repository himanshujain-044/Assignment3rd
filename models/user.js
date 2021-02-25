const mongoose = require("mongoose");
const {Task,DataSchema} = require("../models/task");
const UserSchema = new mongoose.Schema({
    Name:
    {type:String,required:true},
    Age:Number,
    Email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: [true, "Email should be unique"],
        required: [true, "Email must required"]
    },
    Profile:String,
    Username:{
        type:mongoose.Schema.Types.String,ref:"Task",
        unique:true
    },
    Password:{
        type:String,
        required:[true,"Password Must required"]
     },
    Token:String,
   });
module.exports = mongoose.model('user', UserSchema);