const express = require("express");
const app = express();
const Post = require("../models/postModel");

app.use(express.json())
app.use(express.urlencoded({extended: false}))

exports.test = (req, res) => 
{
    console.log(req.body);
    const post = new Post({post: {
        login: req.body.login,
        imageUrl: req.body.imageUrl,
        post_text: req.body.post_text,
        like: req.body.like,
        disLike: req.body.disLike
    }})
    post.save().then(() => res.status(201).json({message: "post created"}))
}