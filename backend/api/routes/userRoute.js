const user = require("../controllers/userController.js");
const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({extended: false});

router.use("/", urlencodedParser, jsonParser, user.signup)
router.get("/test", urlencodedParser, jsonParser, user.testcode)
router.post("/login", urlencodedParser, jsonParser, user.login)
module.exports = router;