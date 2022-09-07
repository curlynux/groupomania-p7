const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const User = require("../../api/models/userModel.js")
const jwt = require("jsonwebtoken");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

exports.signup = async (req, res, next) =>
{
    try {
        const hashedPass = await bcrypt.hash(req.body.password, 10);
        console.log(req.body);
        const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPass,
    });
    
       const user = await newUser.save();
       console.log(user)
       console.log("user created !");
        return res.status(201).json({message: "user creates sucessfully !"});
       } catch (err) {
      res.status(500).json(err);
     }
}

exports.login = (req, res, next) =>
{
    console.log("test code");
    User.findOne({email: req.body.email})
    .then(user => 
    {
    console.log("test code 2");

        if(!user === null)
            return res.status(401).json({message: "email/mdp incorrect"})
        else
        {
            bcrypt.compare(req.body.password, user.password)
            .then(valid => 
            {
                if(!valid)
                    return res.status(401).json({message: "email/mdp incorrect"})
                else
                {
                    console.log("test req test again");
                    res.status(200).json({
                        userId: user._id, token: jwt.sign({ userId: user._id },
                        "RANDOM_TOKEN_SECRET", {expiresIn: '24h'})
                    });   
                
                }
            })
            .catch((error) => 
            {
                console.log(user);
                console.error(`cet une erreur 2 ! ${error}`)
                res.status(500).json({error})
            });
        }
    })
    .catch((error) => 
    {
        console.error(`cet une erreur 3 ! ${error}`)
        res.status(500).json({error})
    });
}