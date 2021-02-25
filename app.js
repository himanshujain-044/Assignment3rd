const express = require("express");
const app = express();
const path = require("path");
const cors = require('cors');
require("dotenv").config();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const user = require('./routes/user');
const Auth=require("./Auth/auth");
const task = require("./routes/task")
app.use(bodyParser.json());
const multer  = require('multer');
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}
const upload = multer({ storage: storage, fileFilter: fileFilter });




var corsOptions = {
    origin: 'http://localhost:8080',//another url or * to all the web can access
    optionsSuccessStatus: 200 // For legacy browser support
}
app.use(cors(corsOptions))


app.use(cors());


app.listen(3000,(err)=>{
    if(err){
        console.log(err);
    }
    else{
    mongoose.connect("mongodb://m001-student:m001-mongodb-basics@sandbox-shard-00-00.xmfx7.mongodb.net:27017,sandbox-shard-00-01.xmfx7.mongodb.net:27017,sandbox-shard-00-02.xmfx7.mongodb.net:27017/Userinfo?ssl=true&replicaSet=atlas-ibvxid-shard-0&authSource=admin&retryWrites=true&w=majority",{ useNewUrlParser: true ,useUnifiedTopology: true } )
    .then(()=>{
      console.log("Connnection made Successfully and server is running on "+3000);  
    }).catch(()=>{ console.log("erreo")})
}
});

app.post("/signup" ,upload.single('Profile') ,user.signup);
app.post("/login",user.login);

app.post("/insert",Auth.ensure, task.insert);
app.post("/delete",Auth.ensure, user.delete);

app.get("/seetask",task.seetask);
app.post("/logout",Auth.ensure,user.logout);
app.post("/update",Auth.ensure,task.update);
app.post("/see",task.see);
app.post("/U",task.join);