const express = require("express"); // Import express to access express' router
const router = express.Router(); // Obtain router
const sauceController = require("../controllers/sauces"); // Import controllers
const auth = require("../middleware/auth"); // Import auth middleware
const multer = require("../middleware/multer-config"); // Import multer-config for file handling


// router.get('/', auth, stuffController.getAllThings); // Getting all items
router.post('/', auth, multer, sauceController.createSauce); // Saving a sauce
// router.get('/:id', auth,  stuffController.getOneThing); // Getting a specific item
// router.put('/:id', auth, multer, stuffController.modifyThing); // Updating an item
// router.delete('/:id', auth,  stuffController.deleteThing); // Deleting an item

module.exports = router; // export router