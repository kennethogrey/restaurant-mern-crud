const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './client/public/images');
  },
  filename: function (req, file, cb) {
    console.log(file);
    cb(null, Date.now() + path.extname(file.originalname));
  }
})

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ['image/jpeg', 'image/png', 'image/gif'];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};



const upload = multer({ storage, fileFilter });

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

mongoose
  .connect("mongodb://127.0.0.1:27017/mernCrud", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("database connection successful"))
  .catch((err) => console.log(err));

//db schema
const restaurantSchema = mongoose.Schema({
  name: String,
  cuisine: String,
  location: String,
  image: String,
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);


app.get("/", (req, res) => {
  res.sendStatus(200);
});


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

app.get("/restaurants", (req, res) => {
  Restaurant.find()
    .then((items) => res.json(items))
    .catch((err) => console.log(err));
});

//delete
app.delete("/delete/:id", (req, res) => {
  Restaurant.findByIdAndDelete(req.params.id)
    .then((doc) => {
      if (doc) {
        // Check if the image field is not null
        if (doc.image) {
          // Delete the associated image from local storage
          const imagePath = path.join(__dirname, "client", "public", "images", doc.image);
          fs.unlinkSync(imagePath);
          console.log(doc.image);
        }
        res.send(doc); // Return the deleted document
      } else {
        res.status(404).send("Document not found"); // Document with the specified ID was not found
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Internal Server Error"); // Error occurred while deleting the document
    });
});

app.put("/update/:id", (req, res) => {
  Restaurant.findByIdAndUpdate(
    { _id: req.params.id },
    {
      name: req.body.name,
      cuisine: req.body.cuisine,
      location:req.body.location,
    }
  )
    .then((doc) => console.log(doc))
    .catch((err) => console.log(err));
});

module.exports = app;