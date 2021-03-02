const express = require("express");
const app = express();
const path = require("path");
const cors = require('cors');
require("dotenv").config();
const fs = require('fs');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const user = require('./routes/user');
const Auth=require("./Auth/auth");
const task = require("./routes/task");
app.use(bodyParser.json());
const multer  = require('multer');
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
        cb(null, true);
    } else {
        cb(new Error("Image should be of png or jpeg format"), false);
    }
}
const upload = multer({ storage: storage, fileFilter: fileFilter });




var corsOptions = {
    origin: 'http://localhost:8080',//another url or * to all the web can access
    optionsSuccessStatus: 200 // For legacy browser support
}
app.use(cors(corsOptions))


app.use(cors());
const port=process.env.PORT || 3000;

app.listen(port,(err)=>{
    if(err){
        console.log(err);
    }
    else{
    mongoose.connect(process.env.url,{ useNewUrlParser: true ,useUnifiedTopology: true ,useCreateIndex: true} )
    .then(()=>{
      console.log("Connnection made Successfully and server is running on "+port);  
    }).catch((err)=>{ console.log(err)})
}
});

app.post("/signup" ,upload.single('Profile') ,user.signup);
app.post("/login",user.login);

app.post("/insert",Auth.ensure, task.insert);
app.get("/delete",Auth.ensure, user.delete);
app.get("/logout",Auth.ensure,user.logout);
app.post("/update",Auth.ensure,task.update);
app.get("/gettask",Auth.ensure,task.gettask);
app.get("/getalluser",Auth.ensure,user.getalluser);
app.get("/getuser",Auth.ensure,user.getuser);


app.get("/",(req,res)=>{
    res.status(200).json({
        Success:"Please open other api in postman"
    })
})







