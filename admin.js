const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Cloth = require("./models/cloth");

const PORT = 3200;

mongoose.connect("mongodb://localhost:27017/online_clothing_store", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/images"));
//app.use(methodOverride("_method"));
//app.use(flash());
app.set("view engine", "ejs");
//mongoose.set('useFindAndModify', false);

app.get("/", function(req, res) {
  res.redirect("/new");
});

app.get("/new", function(req, res) {
  res.render("admin/new");
});

app.post("/", function(req, res) {
  if (req.body.category!=="Custom" && req.body.size===undefined) {
      // flash error
      res.redirect("/");
  } else {
    let newCloth = {name: req.body.name, image: req.body.image, price: req.body.price, category: req.body.category, size: req.body.size};
    Cloth.create(newCloth, function(err, cloth) {
      if (err) {
        console.log("err");
      } else {
          // flash success
          console.log("success");
          res.redirect("/");
      }
    });
  }
});

app.listen(PORT, function(){
    console.log("Admin Server has started at port " + PORT);
});
