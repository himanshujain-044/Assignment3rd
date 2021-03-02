const {User,UserSchema}= require("../models/user");
const {Task,DataSchema} = require("../models/task");
const { Mongoose } = require("mongoose");
const user = require("../Auth/auth");

module.exports.insert = async (req,res)=>{

   try{
        const u = await User.findOne({Username:req.Username})
        const myEnum = {cmp:"Completed",pcmp:"Partailly Completed",ncmp:"Not Started"}
        const data = new Task();
        const status = req.body.Status;
        data.Status= myEnum[status];
        data.Username = req.Username;
        data.Title=req.body.Title;
        data.Description = req.body.Description;
        data.TaskID=u._id;
        await  data.save();   
        res.status(200).json({DataWhichyouHaveInserted:data})
}
  catch(err){
    console.log(err.message);
    res.status(400).json({Decription:"This description already used",Error:err.message});
    
  }
    }




  module.exports.gettask=async (req,res)=>{
    try{
      const user=await User.findOne({Username:req.Username});
      Task.find({ Username: user.Username }, (error, result) => {
        if(error) {
            return res.status(500).send(error);
        }
        if(result[0].Username==null)
        res.end("User does not enter any task yet")
        else
        res.send(result);
    });
    }
    catch(err){
      res.status(500).json({Error:"Can not find user",Error:err.message})
    }
     
  }



  module.exports.update=async(req,res)=>{
        const task = await Task.findOne({Username:req.Username,Description:req.body.Description})

        if(task!=null){
        
               const myEnum = {1:"Completed",0:"Partailly Completed",2:"Not Started"}
               const status = req.body.Status;
               Task.updateOne({Username:task.Username,Description:task.Description},{$set:{
               Title:req.body.Title,
               Description:req.body.Description,
               Status:myEnum[status]
               }},(err,data)=>{{res.status(200).json({UpdatedData:"Data has been updated successfully"})}})
                                                      
                      }
    else{
      res.status(400).json({Task:"Task does not Exits you have to insert task first or provide the valid description"})
    }
  }
 

 