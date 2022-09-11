const mongoose = require("mongoose");

const Post = new mongoose.Schema({
    post: {
    login: String,
    imageUrl: String,
    post_text: String,
    like: Number,
    disLike: Number
    }
});

module.exports = Post;