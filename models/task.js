const mongoose = require("mongoose");
const validator= require("validator");
const DataSchema = new mongoose.Schema({
    Username:{
        required:true,
        type:String,
    },
    Title:{
        type:String,
        max:10,
    },
    Description:{
        type:String,
        unique:true,
        required:true,
        max:80,
    },
   TaskID:{type:mongoose.Schema.Types.ObjectId},
        Status:String
    })

DataSchema.pre("save",  function(next){
   console.log("EveryThing is fine")
   next();
 });
DataSchema.post("save",(next)=>{
    console.log("Data Saved successfully");
})

module.exports.Task=mongoose.model('userdata',DataSchema);
module.exports.DataSchema=DataSchema;


































//     DataSchema.statics.getData = function() {
//         return new Promise((resolve, reject) => {
//           this.find((error, docs) => {
//             if(error) {
//               console.error(error)
//               return reject(error)
//             }
//             resolve(docs)
//           })
//         })
//       }

//   mongoose.model('userdata',DataSchema).getData()
//   .then(docs => {
//     console.log(docs);
//   })
//   .catch(err => {
//     console.error(err)
//   })