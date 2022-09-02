const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const User = require("../../api/models/userModel.js")
const jwt = require("jsonwebtoken");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
console.log("test");

exports.signup = (req, res, next) =>
{
    console.log("test");
    console.log(req.body);
    bcrypt.hash(req.body.password, 10)
    .then(hash => 
    {
        console.log("test");
        const user = new User({email: req.body.email, password: hash});
        console.log(`HASH: %s`, hash);
        user.save()
        .then(() => res.status(201).json({message: "utilisateur créé !"}))
        .catch((error) => 
        {
            console.log(req.body);

            console.error(`c'est une bad request 1 ! ${error}`)
            res.status(400).json({error})
        });
    })
    .catch((error) => 
    {
        console.log(error);
        res.status(500).json({error})
    });
    next()
}

exports.testcode = ((req, res) => 
{
    res.send("curlynux")
});

exports.login = (req, res, next) =>
{
    User.findOne({email: req.body.email})
    .then(user => 
    {
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