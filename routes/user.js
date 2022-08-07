const express = require("express"); // Import express to access express' router
const router = express.Router(); // Obtain router
const userController = require("../controllers/user"); // Import user controllers

router.post('/signup', userController.signup); // Signup route and controller
router.post('/login', userController.login); // Login route and controller

module.exports = router; // export router