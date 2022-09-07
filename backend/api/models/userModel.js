const mongoose = require("mongoose"); 
const uniqueValidator = require("mongoose-unique-validator")
const Schema = mongoose.Schema

const User = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: true
    },
    password: {
        type: String
    },
    role: {type: String, default: "user"}
});

User.plugin(uniqueValidator);

module.exports = mongoose.model("User", User);