const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Cloth = require("./models/cloth");

const PORT = 3000;

mongoose.connect("mongodb://localhost:27017/online_clothing_store", { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/images"))
//app.use(methodOverride("_method"));
//app.use(flash());
app.set("view engine", "ejs");
//mongoose.set('useFindAndModify', false);

app.get("/", function(req, res) {
    res.render("index");
});

app.get("/readymade", function(req, res) {
    Cloth.find({"category": "Gents ReadyMade"}, function(err, gentsCloths) {
        if (err) {
            console.log(err);
        } else {
            Cloth.find({"category": "Ladies ReadyMade"}, function(err, ladiesCloths) {
                if (err) {
                    console.log(err);
                } else {
                    res.render("readymade", {gentsCloths: gentsCloths, ladiesCloths: ladiesCloths});
                }
            });
        }
    });
});

app.get("/custom", function(req, res){
    Cloth.find({"category": "Custom"}, function(err, cloths) {
        if (err) {
            console.log(err);
        } else {
            res.render("custom", { cloths: cloths});
        }
    });
});

app.listen(PORT, function() {
    console.log("ShopBest Server has started at port " + PORT);
});