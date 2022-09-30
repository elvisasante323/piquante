const express = require("express"); // Import express to access express' router
const router = express.Router(); // Obtain router
const sauceController = require("../controllers/sauces"); // Import controllers
const auth = require("../middleware/auth"); // Import auth middleware
const multer = require("../middleware/multer-config"); // Import multer-config for file handling


router.get('/', auth, sauceController.read); // Getting all sauces
router.post('/', auth, multer, sauceController.create); // Saving a sauce
router.get('/:id', auth,  sauceController.get); // Getting a specific sauce
router.put('/:id', auth, multer, sauceController.update); // Updating a sauce
router.delete('/:id', auth,  sauceController.delete); // Deleting a sauce
router.post('/:id/like', auth, sauceController.like); // Liking a sauce

module.exports = router; // export router