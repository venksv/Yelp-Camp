var mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment");

var data = [
        {
            name: "Salmon Creek",
            image: "https://farm2.staticflickr.com/1281/4684194306_18ebcdb01c.jpg",
            description: "Billions upon billions colonies tesseract realm of the galaxies Drake Equation venture consectetur, another world from which we spring, laws of physics. Venture trillion consectetur adipisicing elit two ghostly white figures in coveralls and helmets are soflty dancing at the edge of forever sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam. Science, with pretty stories for which there's little good evidence. Astonishment."
        },
        {
            name: "Turkey Hill",
            image: "https://farm2.staticflickr.com/1363/1342367857_2fd12531e7.jpg",
            description: "Pommy ipsum marmite numpty corgi jolly hockey sticks, Shakespeare naff off give you a bell pennyboy twiglets, Sonic Screwdriver flabbergasted on the beat oopsy-daisies. Have a gander ponce Northeners pork scratchings clock round the earhole teacakes a reet bobbydazzler, Northeners have a bash down the village green gallivanting around what a mug"
        },
        {
            name: "Dubare Campground",
            image: "https://farm2.staticflickr.com/1281/4684194306_18ebcdb01c.jpg",
            description: "Billions upon billions colonies tesseract realm of the galaxies Drake Equation venture consectetur, another world from which we spring, laws of physics. Venture trillion consectetur adipisicing elit two ghostly white figures in coveralls and helmets are soflty dancing at the edge of forever sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam. Science, with pretty stories for which there's little good evidence. Astonishment."
        },
        {
            name: "Nandi Hills",
            image: "https://farm2.staticflickr.com/1281/4684194306_18ebcdb01c.jpg",
            description: "Pommy ipsum marmite numpty corgi jolly hockey sticks, Shakespeare naff off give you a bell pennyboy twiglets, Sonic Screwdriver flabbergasted on the beat oopsy-daisies. Have a gander ponce Northeners pork scratchings clock round the earhole teacakes a reet bobbydazzler, Northeners have a bash down the village green gallivanting around what a mug"
        }
    ];

function seedDB() {
    Campground.remove({}, function(err){
        if (err) {
            console.log(err);
        } else {
            console.log("Removed campgrounds.");
                //Add a few camps.
            data.forEach(function(camp) {
                Campground.create(camp, function(err, savedCamp) {
                    if(err) {
                        console.log(err);
                    } else {
                        console.log("Added camp: " + savedCamp.name);

                        //Add comments.
                        Comment.create(
                            {
                                text: "Great site, good facilities.",
                                author: "Darth Vader"
                            }, function(err, comment) {
                                if (err) {
                                    console.log(err);
                                } else {
                                    savedCamp.comments.push(comment);
                                    savedCamp.save();
                                    console.log("Created new comment.");
                                }
                            });

                    }
                });
            });
        }
    });
}

module.exports = seedDB;
