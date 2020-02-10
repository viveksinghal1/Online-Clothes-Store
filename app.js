const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = 3000;


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

app.listen(PORT, function() {
    console.log("ShopBest Server has started at port" + PORT);
});