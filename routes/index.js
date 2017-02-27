var express = require("express");
var router = express.Router();
var User = require("../models/user");
var passport = require("passport");

router.get("/", function(req, res) {
    res.render("landing");
});


//AUTH ROUTES
router.get("/register", function(req, res) {
    res.render("register");
});

//Sign Up logic.
router.post("/register", function(req, res) {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if (err) {
            //console.log(err);
            req.flash("error", err.message);
            return res.render("register");
        }
        
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to Yelp Camp, " + user.username);
            res.redirect("/campgrounds");
        });
    });
});

//Login logic.
router.get("/login", function(req, res) {
    res.render("login");
});

router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), function(req, res) {
    req.flash("success", "Logged in successfully!");
});

//Logout logic.
router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "Logged out succesfully.");
    res.redirect("/campgrounds");
    
});

module.exports = router;