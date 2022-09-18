const express = require("express");
const app = express();
const Post = require("../models/postModel");

app.use(express.json())
app.use(express.urlencoded({extended: false}))

exports.createPost = (req, res) => 
{
    
    console.log(req.body);
    console.log(req.file.filename);
    console.log(req.file);
    
        const post = new Post({post: {
            login: req.body.login,
            imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
            post_text: req.body.post_text,
            like: req.body.like,
            disLike: req.body.disLike
        }})
        post.save().then(() => res.status(201).json({message: "post created"}))
}

exports.getPost = (req, res) =>
{
    Post.find()
    .then(posts => res.status(200).json(posts))
    .catch(error => res.status(404).json({error}))
}

exports.getOnePost = (req, res) =>
{
    Post.findOne({_id: req.post.id}).then(post => {console.log(post)})
    console.log("get one post");
}