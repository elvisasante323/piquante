const mongoose = require("mongoose"); // Import mongoose to create a schema
const uniqueValidator = require("mongoose-unique-validator"); // Import unique validator

// Specify model schema
const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

// Apply unique validator
userSchema.plugin(uniqueValidator);

// Export model making it accessible globally
module.exports = mongoose.model('User', userSchema);
