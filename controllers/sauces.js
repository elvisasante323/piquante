const Sauce = require("../models/sauce"); // Import sauce schema
const fs = require("fs"); // Access to file system

// Creates a new sauce
exports.createSauce = (req, res, next) => {

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
        .catch( (error) => { res.status(400).json({ error: 'hello error' }); })
};