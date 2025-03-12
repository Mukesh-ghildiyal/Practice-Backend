const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,  // Ensuring email is mandatory
        unique: true,    // No duplicate emails allowed
        trim: true       // Removes extra spaces
    },
    password: {
        type: String,
        required: true   // Password is mandatory
    },
    salt: {
        type: String,
        required: true  // Salt should always be present for hashing
    },
    phone: {
        type: Number,
        required: false,
    },
    usertype: {
        type: String,
        enum: ['Buyer', 'Seller'],  // Corrected `enum`
        required: true  // User type should always be specified
    }
}, { timestamps: true }); // Adds `createdAt` and `updatedAt` fields

module.exports = mongoose.model('User', UserSchema);
