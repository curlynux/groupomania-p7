const express = require("express");
const app = express();
const Post = require("../models/postModel");
const fs = require("fs")
app.use(express.json())
app.use(express.urlencoded({extended: false}))

exports.createPost = (req, res) => 
{
    
    console.log(req.body);
    console.log(req.file.filename);
    console.log(req.file);
    
        const post = new Post({post: {
            login: req.body.login,
            userId: req.auth.userId,
            imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
            post_text: req.body.post_text,
            like: req.body.like,
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
    console.log(req.params);
    Post.findOne({_id: req.params.id})
    .then(post => 
    {
        return res.status(200).json(post)
    })
}

exports.deletePost = (req, res) =>
{
    console.log(req.body);
    console.log("userID: ", req.body.userId);
    console.log(req.body.image);
    console.log(req.params);
    var filename = req.body.image.split("/")[4]
    
    // //add fs.unlink to delete image
    fs.unlink(`images/${filename}`, () => 
    {
    Post.deleteOne({_id: req.params.id})
    .then((post) => {
        console.log(filename);
        console.log("post deleted !");
        return res.status(200).json({message: "post supprimé !"})
        });
    });
}

exports.modifyPost = (req, res) => 
{
    console.log(req.auth);
    console.log(req.file);
    Post.findOne({ _id: req.params.id })
    .then((post) => {

        if(req.auth.userId === post.post.userId)
        {
        const filename = post.post.imageUrl.split("/images/")[1];
        console.log(post);
        if(req.file)
        {
          fs.unlink(`images/${filename}`, () => {
            const postObject = req.file
              ? {post: {
                  ...JSON.parse(req.body.post),
                  imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
                }}
              : { post:{...req.body}};

            Post.updateOne({ _id: req.params.id },
              { post: {...postObject}, _id: req.params.id }
            )
              .then(() => res.status(200).json({ message: "post modifiée." }))
              .catch((error) => res.status(400).json({ error }));
          });
        }
      }
        console.log('req.body')
        console.log(req.body)


        Post.updateOne({ _id: req.params.id }, {post:  {...req.body}})
        .then(() => res.status(200).json({ message: "post modifiée." }))
        .catch((error) => res.status(400).json({ error }));
      
    })
    .catch((error) => res.status(400).json({ error }));
}

// exports.media = (req, res) =>
// {
//   console.log(req.file);
//   console.log("this is media");
//   return res.status(201).json(res);
// }