const {User ,UserSchema} = require("../models/user");
const jwt = require("jsonwebtoken");
module.exports.ensure = async (req,res,next)=>{
    const ht = req.headers["authorization"];
    if((typeof(ht))!="undefined"){
        const br = ht.split(" ")[1];
        try{
        const user = await  User.findOne({Token:br})
        if(user!=null){
                    
                    await jwt.verify(br, process.env.Sc)
                    req.Username=user.Username;
                         next();
                         }
                         else
                         res.status(400).json({User:"user does not exits"});
                                
            }
        catch(err){res.status(500).json({Verify:"Token Expired"})}
       
      }
        else{
          res.status(400).json({Token:"Please give a token"})
        }
      }