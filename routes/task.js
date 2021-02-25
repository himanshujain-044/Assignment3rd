const express = require("express");
const router = express;
const User= require("../models/user");
const {Task,DataSchema} = require("../models/task");
const { Mongoose } = require("mongoose");

module.exports.insert = (req,res)=>{
      const myEnum = {1:"Completed",0:"Partailly Completed",2:"Not Started"}
//    if((req.body.Status!="1" )|| (req.body.Status!="-1" )||( req.body.Status!="0")){
//     res.write("In status feild provide the value \"0\" for partially completed \"1\" for completed \"-1\" if not started")
// }
// else{
   console.log(typeof(req.body.Status))
     const data = new Task();
       const status = req.body.Status;
     data.Status= myEnum[status]
     data.Username = req.body.Username;
     data.Title=req.body.Title;
     data.Description = req.body.Description;

     data.save((err,data)=>{
         if(err){
            res.status(401).json({
                error: err
              });
          res.end("Data can not inserted may it be it already prensent or something went wrong");
         }
         else{
         res.end(JSON.stringify(data))
        console.log("yes")
        }
     });
    }
    //}

    module.exports.seetask=(req,res)=>{
      Task.find({},(err,data)=>{
        res.end(JSON.stringify(data));   
      })
    }


    module.exports.see=async (req,res)=>{
      // console.log(typeof(req.params.username))
      // console.log(req.paeams.username)
    //   Task.findOne({ "Username": req.body.Username }, (error, result) => {
    //     if(error) {
    //       console.log("hhii")
    //         return res.status(500).send(error);
    //     }

    //     res.send(result);
    // });

    // Task.findOne({ "Username": req.body.Username }).select("Status Username Title").exec()
    // .then(data=>{
    //   res.status(200).json({
    //     result:data
    //   })
    // }).catch(err=>{
    //   res.status(500).json({Error:err})
    // })

  const ress= await Task.find({ "Username": req.body.Username }).exec()
  
          res.status(200).json({
            result:ress
          })
        }

    module.exports.update=(req,res)=>{
      Task.updateOne({Username:req.body.Username},{$set:{
        Title:req.body.Title,
        Description:req.body.Description,
        Status:req.body.Status
    }},(err,data)=>{})
    res.end("Data is successfullly updated");
    }
    
  // DataSchema.pre("save", function(next) {
  //     var self = this;
  //   console.log("AAAAAAAAAAAAAAAAAA");
  //     mod.findOne({Username : self.Username},function(err, results) {
  //         if(err) {
  //             next(err);
  //         } else if(results) {
  //             console.warn('results', results);
  //             next(new Error("Data already Inserted"));
  //         } else {
  //             next();
  //         }
  //     });
  // });

//   DataSchema.virtual('Data', {
//     ref: 'User',
//     localField: 'Username',
//     foreignField: 'Username',
//     justOne: true
//   });

// const doc =Task.findOne().populate('Data');
//    console.log(doc)

  module.exports.join=(req,res)=>{
    console.log("Bye")
    User.findOne({Username:req.body.Username})
    .populate("Task")
    .exec(function(err,data){
      if(err)
      res.status(500).json({Errpr:err})
      else
      res.status(200).json({Result:data})
    })
  }