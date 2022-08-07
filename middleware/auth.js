require('dotenv').config(); // Access environment variables
const jwt = require("jsonwebtoken"); // Import JWT for token generation

module.exports = (req, res, next) => {

    try {

        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        const userId = decodedToken.userId;

        // Obtain userId
        req.auth = { userId };

        // If userId is not provided in token
        if (req.body.userId && req.body.userId !== userId) {

            throw "Invalid user ID";
        } else {

            next();
        }
    } catch {

        res.status(401).json( { error: new Error("Invalid request!")} );
    }
};