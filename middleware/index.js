const middlewareObj = {};

middlewareObj.isLoggedIn =  function(req, res, next){
    if (req.isAuthenticated()){
        return next();
    }
    req.flash("error", "Please Login First!!");
    res.redirect("back");
}

module.exports = middlewareObj;