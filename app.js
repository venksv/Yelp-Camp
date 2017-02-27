var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    passport    = require("passport"),
    LocalStrategy = require("passport-local"),
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment"),
    User        = require("./models/user"),
    seedDB      = require("./seeds"),
    methodOverride = require("method-override"),
    connectFlash = require("connect-flash")
;

var commentRoutes = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes = require("./routes/index");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

//mongoose.connect("mongodb://localhost/yelpcamp");
//mongoose.connect("mongodb://yelpcamp_user:yelpcamp123@ds163699.mlab.com:63699/yelpcamp");
mongoose.connect(process.env.DATABASEURL);

app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(connectFlash());

//seedDB();

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Meaning of life is 42",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use(indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Yelp Camp Server has started ...");
});