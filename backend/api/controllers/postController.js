const express = require("express");
const app = express();
const Post = require("../models/postModel");

app.use(express.json())
app.use(express.urlencoded({extended: false}))
console.log("test post");
exports.test = (req, res) => 
{
    console.log("test post if works");
    console.log(req.body);
}