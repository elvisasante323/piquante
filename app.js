const express = require("express"); // Express is needed for server purposes
const bodyParser = require('body-parser'); // Import body-parser to extract request body
const userRoutes = require("./routes/user"); // Import user routes
const saucesRoutes = require("./routes/sauces"); // Import sauces routes
const mongoose = require('mongoose'); // Import mongoose to connect to MongoDB cluster
const path = require("path"); // Used for uploading images

const app = express() // Run express

// Connect to MongoDB cluster
mongoose.connect(process.env.MONGO_DB_URI)
    .then( () => {
        console.log('Successfully connected to MongoDB cluster !');
    })
    .catch( (error) => {
        console.log('Unable to connect to cluster !');
        console.log(error);
    });

// Set headers to prevent Cors errors
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json()); // Extract JSON body from request
app.use("/images", express.static(path.join(__dirname, "images"))); // Path for uploading images


// Routes
app.use("/api/sauces", saucesRoutes);
app.use("/api/auth", userRoutes);

module.exports = app; // Export app to make it accessible in server.js