const mongoose = require("mongoose");
const DataSchema = new mongoose.Schema({
    Username:{
        type:String,
        unique:true,
        required:true,
    },
    Title:{
        type:String,
        max:10,
    },
    Description:{
        type:String,
        max:80,
    },
    Status:String
    })
///= mongoose.model('userdata',DataSchema);
module.exports.DataSchema=DataSchema;
module.exports.Task=mongoose.model('userdata',DataSchema);

module.exports.mid=DataSchema.pre("save", function(next) {
        var self = this;
      console.log("AAAAAAAAAAAAAAAAAA");
        mod.findOne({Username : self.Username},function(err, results) {
            if(err) {
                next(err);
            } else if(results) {
                console.warn('results', results);
                next(new Error("Data already Inserted"));
            } else {
                next();
            }
        });
    });



















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