require('dotenv').config(); // Access environment variables
const User = require("../models/user"); // Import User model
const bcrypt = require("bcrypt"); // Import bcrypt algorithm
const jwt = require("jsonwebtoken"); // Import JWT for token generation


// Signup
exports.signup = (req, res, next) => {

    bcrypt.hash(req.body.password, 10)
        .then( (hash) => {

            const user = new User({
                email: req.body.email,
                password: hash
            });

            // Save
            user.save()
                .then( () => {

                    res.status(201).json( {message: "User added successfully!"} );
                    console.log("User: " + user.email + " signed up successfully!");
                })
                .catch( (error) => {

                    res.status(500).json( {error: error} );
                });
        })
        .catch( (error) => {
            console.log("Unable to hash password due to: " + error);
        });

};

// Login
exports.login = (req, res, next) => {

    User.findOne({ email: req.body.email })
        .then( (user) => {

            // User not found
            if (!user) {
                return res.status(401).json( { error: new Error("User not found!")} );
            }

            // Check password if user exists
            bcrypt.compare(req.body.password, user.password)
                .then( (valid) => {

                    if (!valid) {
                        return res.status(401).json( { error: new Error("User not found!")} );
                    }

                    // Token generation
                    const token = jwt.sign({ userId: user._id}, process.env.TOKEN_SECRET, { expiresIn: '24d'});

                    // Both email and password are valid
                    res.status(200).json( {userId: user._id, token: token} );
                    console.log("User has logged in successfully!");
                })
                .catch( (error) => {

                    // Generate internal server error
                    res.status(500).json( { error: error} );
                });
        })
        .catch( (error) => {

            // Generate internal server error
            res.status(500).json( { error: error} );
        });
};