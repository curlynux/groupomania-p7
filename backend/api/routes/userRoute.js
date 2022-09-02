const user = require("../controllers/userController.js");
const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

var jsonParser = express.json();
var urlencodedParser = express.urlencoded({extended: false});
console.log("test");
router.use("/", urlencodedParser, jsonParser, user.signup)
// router.get("/", urlencodedParser, jsonParser, user.signup)
// router.post("/", urlencodedParser, jsonParser, user.signup)
router.use("/test", urlencodedParser, jsonParser, user.testcode)
router.post("/login", urlencodedParser, jsonParser, user.login)
module.exports = router;