const user = require("../controllers/userController.js");
const express = require("express");
const router = express.Router();
var jsonParser = express.json();
var urlencodedParser = express.urlencoded({extended: false});

router.post("/", urlencodedParser, jsonParser, user.signup)
router.post("/login", urlencodedParser, jsonParser, user.login)
module.exports = router;