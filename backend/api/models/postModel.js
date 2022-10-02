const mongoose = require("mongoose");

const Post = new mongoose.Schema({
  post: {
    login: String,
    userId: String,
    imageUrl: String,
    post_text: { type: String, maxlength: 240 },
    like: Number,
    userLiked: [mongoose.ObjectId],
  },
});

module.exports = mongoose.model("post", Post);
