var express = require("express");
var router = express.Router();
var Campground  = require("../models/campground");
var middleware = require("../middleware");


router.get("/", function(req, res) {
    //Get all campgrounds
    Campground.find({}, function(err, allCampgrounds)
    {
        if (err) {
            console.log("ERROR: ");
            console.log(err);
        } else {
//            console.log("CAMP DATA: ");
//            console.log(allCampgrounds);
            res.render("campgrounds/index", {campgrounds: allCampgrounds});
        }
    });
});
    
// Create form
router.get("/new", middleware.isLoggedIn, function(req, res) {
//    res.send("Opening new camp form ...");
    res.render("campgrounds/new");
});

//Create submit
router.post("/", middleware.isLoggedIn, function(req, res) {
    var newCampName = req.body.newcampname;
    var newImage = req.body.newcampimage;
    var newDesc = req.body.newcampdesc;
    var createdBy = {
        id: req.user._id,
        name: req.user.username
    };
        
    //console.log("New camp: " + newCamp);
    // Add to camp array
    var newCamp = {name: newCampName, 
                   image: newImage, 
                   description: newDesc,
                   createdBy: createdBy
    };
    //Create new campground & save.
    Campground.create(newCamp, function(err, campground){
        if (err) {
            console.log("ERROR: ");
            console.log(err);
        } else {
            // console.log("SAVED DATA: ");
            // console.log(campground)
            //Re-route to View All Campgrounds
            res.redirect("/campgrounds");
        }
    });
});


//SHOW - Shows more info about one camp.
router.get("/:id", function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCamp) {
        if (err) {
            console.log("ERROR: ");
            console.log(err);
        } else {
            // console.log("FIND DATA: ");
            // console.log(foundCamp);
            //Re-route to View All Campgrounds
            res.render("campgrounds/show", {campground: foundCamp});
        };
    });
});

//EDIT - show form
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCamp){
        if (err) {
            console.log(err);
            req.flash("error", "Something went wrong.");
            res.redirect("/campgrounds");
        } else {
            res.render("campgrounds/edit", {campground: foundCamp});
        }
    });
});

//UPDATE - commit update
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res) {
    // Find and update camp.
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updCamp){
        if (err) {
            console.log(err);
            req.flash("error", "Something went wrong.");
            res.redirect("/campgrounds");
        } else {
            // Redirect to show camp info
            req.flash("success", "Campground updated successfully!");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

// DELETE route
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err) {
            req.flash("error", "Something went wrong.");
            console.log(err);
        }

        req.flash("success", "Campground deleted successfully!");
        res.redirect("/campgrounds");
    });
});

module.exports = router;