const auth = require("../../middlewares/auth")
const express = require("express")
const router = express.Router();
const app = express();
const jsonParser = app.use(express.json());
const urlencodedParser =  app.use(express.urlencoded({extended: false}));
const post = require("../controllers/postController")

router.post("/post", auth, jsonParser, urlencodedParser, post.test)

module.exports = router;