const express = require("express");
const app = express();
const Post = require("../models/postModel");
const User = require("../models/userModel")
const fs = require("fs");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const createImgUrl = (req) =>
  `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;

exports.createPost = (req, res) => {
  console.log(req.body);
  console.log(req.file?.filename);
  console.log("FILE", req.file);
  const filename = req.file?.filename;

  // if(req.auth.userId === "6319fc45f375ce7c71b7b6b8")
  //   return res.status(403).json({message: "user admin cannot post"})
  // else
  // {
    const post = new Post({
      post: {
        login: req.body.login,
        userId: req.auth.userId,
        imageUrl: filename
          ? `${req.protocol}://${req.get("host")}/images/${filename}`
          : null,
        post_text: req.body.post_text,
        like: req.body.like,
      },
    });
    post
      .save()
      .then(() => res.status(201).json({ message: "post created", post }));
  // }
};

exports.getPost = (req, res) => {
  Post.find()
    .then((posts) => res.status(200).json(posts))
    .catch((error) => res.status(404).json({ error }));
};

exports.getOnePost = (req, res) => {
  console.log(req.params);
  Post.findOne({ _id: req.params.id }).then((post) => {
    return res.status(200).json(post);
  });
};

exports.deletePost = async (req, res) => {
  const authUserId = req.auth.userId;
  const { post } = await Post.findOne({ _id: req.params.id });

  if (!post) return res.status(404).json({ message: "post not found !" });
  if (authUserId !== post.userId && authUserId !== "6319fc45f375ce7c71b7b6b8")
    return res.status(403).json({ message: "user not granted !" });

  await Post.deleteOne({ _id: req.params.id });

  const filename = post.imageUrl?.split("/")?.[4];
  if (filename) {
    fs.unlink(`images/${filename}`, () =>
      res.status(200).json({ message: "post supprimé !" })
    );
  } else res.status(200).json({ message: "post supprimé !" });
};

exports.modifyPost = async (req, res) => {
  console.log(req.body);
  const authUserId = req.auth.userId;
  const _id = req.params.id;
  const { post } = await Post.findOne({ _id });

  if (!post) 
  {
    console.log("RES 1");
    return res.status(404).json({ message: "post not found !" });
  }
  console.log(req.auth.userId);
  const user = await User.findById(req.auth.userId)
  
  if(req.auth.userId === post.userId || user.role === "admin")
  {
    try {
      const updated = await Post.findByIdAndUpdate(_id, 
        {
          $set: {
            "post.post_text": req.body.post_text, 
            "post.imageUrl": req.body.imageUrl ? req.body.imageUrl : post.imageUrl},
          
           
        }, {new: true})
      return res.status(200).json({message: "updated !", updated})
    } catch (error) {
      console.log(error);
    }
  } else 
  {
    return res.status(403).json({message: "user not granted"})
  }
  console.log("USERID", post.userId);
};

/*
  Like a post
*/

exports.likePost = async (req, res) => {
  try {
    const { post } = await Post.findOne({ _id: req.params.id });
    const like = post.like + 1;

    if (post.userLiked?.includes(req.auth.userId))
      return res.status(403).json({ message: "user already liked !" });

    const userLiked = [...(post.userLiked || []), req.auth.userId];

    await Post.updateOne(
      { _id: req.params.id },
      { post: { ...post, like, userLiked } }
    );

    return res.status(200).json({ message: "post liké." });
  } catch (error) {
    res.status(400).json({ error });
  }
};

