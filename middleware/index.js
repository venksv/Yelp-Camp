var Campground  = require("../models/campground"),
    Comment     = require("../models/comment");

var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function (req, res, next){
    if (req.isAuthenticated()) {
        Campground.findById(req.params.id, function(err, foundCamp){
            if (err) {
                console.log(err);
                req.flash("error", "Campground not found.");
                res.redirect("/campgrounds");
            } else {
                //Check for author
                if(foundCamp.createdBy.id.equals(req.user._id)) {
                    //Show edit form
                    next();
                } else {
                    //No authority to update
                    req.flash("error", "You do not have permission to update the campground.");
                    res.redirect("back");
                    //res.redirect("/campgrounds/" + req.params.id);
                }
            }
        });
    } else {
        req.flash("error", "Please login first.");
        res.redirect("back");
    }
};

middlewareObj.checkCommentOwnership = function (req, res, next){
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if (err) {
                console.log(err);
                res.redirect("/campgrounds/" + req.params.id);
            } else {
                //Check for author
                if(foundComment.author.id.equals(req.user._id)) {
                    //Show edit form
                    next();
                } else {
                    //No authority to update
                    req.flash("error", "You do not have permission to update comments.");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "Please login first.");
        res.redirect("back");
    }
};

middlewareObj.isLoggedIn =  function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    
    req.flash("error", "Please login first.");
    res.redirect("/login");
};


module.exports = middlewareObj;