const auth = require("../../middlewares/auth")
const express = require("express")
const router = express.Router();
const app = express();
const jsonParser = app.use(express.json());
const urlencodedParser =  app.use(express.urlencoded({extended: true}));
const post = require("../controllers/postController")
const multer = require("../../middlewares/multer-config")

// router.use(jsonParser)
router.post("/post", auth, jsonParser, urlencodedParser, multer, post.createPost)

module.exports = router;