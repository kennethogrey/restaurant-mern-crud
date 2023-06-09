const express = require("express");
const cors = require("cors");
const mongoose  = require("mongoose");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './client/public/images');
    },
    filename: function (req, file, cb) {
        console.log(file);
      cb(null, Date.now()+path.extname(file.originalname));
    }
})

const fileFilter = (req,file,cb)=>{
    const allowedFileTypes  = ['image/png', 'image/jpg','img/jpeg'];
    if(allowedFileTypes.includes(file.mimetype)){
        cb(null,true);
    }else{
        cb(null,false);
    }
}



const upload = multer({storage,fileFilter});

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());

mongoose
    .connect("mongodb://127.0.0.1:27017/mernCrud",{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    })
    .then(()=>console.log("database connection successful"))
    .catch((err)=>console.log(err));

//db schema
const restaurantSchema = mongoose.Schema({
    name:String,
    cuisine:String,
    location:String,
    image:String,
});

const Restaurant = mongoose.model("Restaurant",restaurantSchema);


app.get("/",(req, res)=>{
    res.send("Express is here");
});

// app.post("/create",upload.single('image'),(req,res)=>{
//     Restaurant.create({
//         name: req.body.name,
//         cuisine:req.body.cuisine,
//         location:req.body.location,
//         image:req.file.filename,
//     }).then((doc) => console.log(doc)).catch((err) => console.log(err));
// });

app.post("/create", upload.single("image"), async (req, res) => {
    try {
      const { name, cuisine, location } = req.body;
      const image = req.file ? req.file.filename : null;
  
      const restaurant = await Restaurant.create({
        name,
        cuisine,
        location,
        image,
      });
  
      console.log(restaurant);
      res.status(200).json({ message: "Restaurant created successfully" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Failed to create restaurant" });
    }
  });


app.listen(3001,function(){
    console.log("server is running");
});