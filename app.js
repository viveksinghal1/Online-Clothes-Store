const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Cloth = require("./models/cloth");
const passport = require("passport");
const localStrategy = require("passport-local");
const dotenv = require("dotenv");
const User = require("./models/user");
const Order = require("./models/order");
const flash = require("connect-flash");
const middleware = require("./middleware/index");
const PORT = process.env.PORT || 3000;

dotenv.config();

const url = process.env.DATABASEURL || "mongodb://localhost:27017/online_clothing_store";

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log("connected to local DB");
  })
  .catch(err => {
    console.log("ERROR: " + err.message);
  });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/images"))
//app.use(methodOverride("_method"));
app.use(flash());
app.set("view engine", "ejs");
//mongoose.set('useFindAndModify', false);


app.use(
    require("express-session")({
      name: "user-cookie",
      secret: "secret sentence for authentication",
      resave: false,
      saveUninitialized: false
    })
  );

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.get("/", function(req, res) {
    res.render("index");
});

app.post("/register", function(req, res) {
    if (req.body.password.trim().length <= 7) {
      req.flash("error", "Password Should be 8 Characters long");
      return res.redirect("back");
    }
    if (req.body.password === req.body.confirm) {
        var newUser = new User({
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              username: req.body.username
            });
            User.register(newUser, req.body.password, function(err, user) {
              if (err) {
                req.flash("error", err.message);
                return res.redirect("back");
              }
              passport.authenticate("local")(req, res, function() {
                req.flash("success", "Welcome to ShopBest" + user.username);
                return res.redirect(req.get("referer"));
              });
            });
    } else {
      req.flash("error", "Passwords do not match. Try again.");
      return res.redirect("back");
    }
  });


app.post(
    "/login",
    passport.authenticate("local", {
      // successRedirect: "/campgrounds",
      failureFlash: true,
      failureRedirect: "back"
    }),
    function(req, res) {
      req.flash("success", "Welcome back " + req.user.username + "!!");
      res.redirect(req.get("referer"));
    }
);

app.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "Logged you out!");
    res.redirect(req.get("referer"));
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

app.get("/addtocart/:id", middleware.isLoggedIn, function(req, res){
    User.findById(req.user._id, function(err, user){
        if (err) {
            req.flash("error", err.message);
            res.redirect("back");
        } else {
            Cloth.findById(req.params.id, async function(err, cloth){
                if (err) {
                    req.flash("error", err.message);
                    res.redirect("back");
                } else {
                    let newOrder = new Order({
                        clothID: cloth._id
                    });

                    try {
                        let order = await Order.create(newOrder);
                        user.cart.push(order);
                        await user.save();
                        req.flash("success", "Added the " + cloth.name + " to your cart.");
                        res.redirect('back');
                    } catch(err) {
                        req.flash("error", err.message);
                        res.redirect("back");
                    }
                }
            });
        }
    });
});

app.listen(PORT, process.env.IP, function() {
    console.log("ShopBest Server has started at port " + PORT);
});