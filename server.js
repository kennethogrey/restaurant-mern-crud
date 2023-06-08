
const express = require("express");
const cors = require("cors");
const mongoose  = require("mongoose");

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());

mongoose
    .connect("mongodb://localhost:27017/mern-crud")
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

app.post("/create",(req,res)=>{
    Restaurant.create({
        name: req.body.name,
        cuisine:req.body.cuisine,
        location:req.body.location,
        image:req.body.image,
    }).then((doc) => console.log(doc)).catch((err) => console.log(err));
});

app.listen(3001,function(){
    console.log("server is running");
});