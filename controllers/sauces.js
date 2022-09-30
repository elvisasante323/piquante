const Sauce = require("../models/sauce"); // Import sauce schema
const fs = require("fs"); // Access to file system

// Creates a new sauce
exports.create = (req, res, next) => {

    const url = req.protocol + "://" + req.get("host"); // Get hostname
    req.body.sauce = JSON.parse(req.body.sauce); // Convert into a JSON format

    const sauce = new Sauce({
        userId: req.body.sauce.userId,
        name: req.body.sauce.name,
        manufacturer: req.body.sauce.manufacturer,
        description: req.body.sauce.description,
        mainPepper: req.body.sauce.mainPepper,
        imageUrl: url + "/images/" + req.file.filename,
        heat: req.body.sauce.heat,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisLiked: [],
    });

    sauce.save()
        .then( () => { res.status(201).json({ message: 'Sauce saved successfully!'}); })
        .catch( (error) => { res.status(400).json({ error: 'Unable to save sauce!' }); })
};

// Get all sauces
exports.read = (req, res, next) => {

    Sauce.find()
        .then( (sauce) =>
        {
            res.status(200).json(sauce);
        } )
        .catch( (error) => { res.status(400).json({ error: error }) } )
};

// Gets a particular sauce
exports.get = (req, res, next) => {

    Sauce.findOne({ _id: req.params.id } )
        .then((sauce) => { res.status(200).json(sauce); })
        .catch( (error) => { res.status(404).json({ error: error } ); }
        );
};

// Update a sauce
exports.update = (req, res, next) => {

    let sauce = new Sauce({ _id: req.params._id});

    // When there is a file with the request
    if (req.file) {

        const url = req.protocol + "://" + req.get("host"); // Get hostname
        req.body.sauce = JSON.parse(req.body.sauce); // Convert into a JSON format

        sauce = {
            _id: req.params.id,
            name: req.body.sauce.name,
            manufacturer: req.body.sauce.manufacturer,
            description: req.body.sauce.description,
            mainPepper: req.body.sauce.mainPepper,
            imageUrl: url + "/images/" + req.file.filename,
            price: req.body.sauce.price,
            userId: req.body.sauce.userId,
            heat: req.body.sauce.heat
        };
    } else {

        sauce = {
            _id: req.params.id,
            name: req.body.name,
            manufacturer: req.body.manufacturer,
            description: req.body.description,
            mainPepper: req.body.mainPepper,
            price: req.body.price,
            userId: req.body.userId,
            heat: req.body.heat
        };
    }

    Sauce.updateOne( { _id: req.params.id }, sauce )
        .then( () => { res.status(201).json({ message: 'Sauce updated successfully!'}); })
        .catch( (error) => { res.status(400).json({ error: error }); })
};

// Delete a sauce
exports.delete = (req, res, next) => {

    // Restrict unauthorized deletion
    Sauce.findOne( { _id: req.params.id} )
        .then( (sauce) => {

            // No resource found
            if (!sauce) {
                return res.status(400).json( { error: new Error ("Unauthorized request!") });
            }

            if (sauce.userId !== req.auth.userId) {
                return res.status(400).json( { error: new Error ("Unauthorized request!") });
            }
        })
        .catch( (error) => { res.status(400).json({ error: error }); } );


    // Actual deletion involving removal of image files
    Sauce.findOne( { _id: req.params.id} )
        .then( (sauce) => {

            const filename = sauce.imageUrl.split("/images/")[1];
            fs.unlink("images/" + filename, () => {


                Sauce.deleteOne({ _id: req.params.id} )
                    .then((sauce) => { res.status(200).json({ message: 'Sauce has been deleted'}); })
                    .catch( (error) => { res.status(404).json({ error: error } ); }
                    );
            });
        })
        .catch( (error) => { res.status(400).json({ error: error }); } );
};

// Like a sauce
exports.like = (req, res, next) => {

    let sauce = new Sauce({ _id: req.params._id});

    sauce = {
        _id: req.params.id,
        like: 1
    };

    Sauce.updateOne( { _id: req.params.id }, sauce )
        .then( () => { res.status(201).json({ message: 'Sauce liked successfully!'}); })
        .catch( (error) => { res.status(400).json({ error: error }); })
};