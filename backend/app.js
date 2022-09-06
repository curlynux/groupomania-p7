const express = require("express");
const cors = require("cors");
const userRoutes = require("./api/routes/userRoute");
const mongoose = require("mongoose")
const app = express();
const path = require("path");
const morgan = require("morgan");

require("dotenv").config()

app.use(cors());
app.use(morgan("dev"))
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use("/api/auth", userRoutes);
app.use(userRoutes)
app.use(express.static(path.join(__dirname, '/public')));
app.use((req, res, next) => 
{
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-requested-With, Content, Accept, Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    next();
});
mongoose.connect(`mongodb+srv://${process.env.MONGOLOGIN}:${process.env.MONGOPSWD}@groupomania-p7.89kozdl.mongodb.net/?retryWrites=true&w=majority`,
{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("connexion a mongodb reussi !"))
.catch(() => console.log("connexion a mongo echoué !"));

app.use("/images", express.static("images"))
module.exports = app;