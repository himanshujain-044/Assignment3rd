const express = require("express");
const router = express;
const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
module.exports.ensure=(req,res,next)=>{
    const ht =req.headers["authorization"];
    if(typeof (ht !== undefined)){
        console.log("bttt");
        const br = ht.split(" ")[1];
        // req.token= bt;
        User.findOne({Username:req.body.Username},(err,user)=>{
                if(err){
                  console.log("erree")
                    res.status(400).json({
                        error: err
                      });
                }
                else{
                  console.log("usrr")
                  if(user!=null)
                    bcrypt.compare(req.body.Password, user.Password, function(err, isMatch) {
                       if (!isMatch) {
                         res.end("Password does not match")
                        } else
                    if(br==user.Token){
                      console.log("pass")
            jwt.verify(br, process.env.Sc, (err, verifiedJwt) => {
            if(err)
              res.send(err.message)
            else{
              console.log("yes")
             next();
            }
    })
  
}
    else
    res.end("Please provide the valid token");

})
else
res.end("Give the correct username");
  }
})

}


    else{
        res.write("Please Provide a valid token")
        res.sendStatus(400);
         }


}