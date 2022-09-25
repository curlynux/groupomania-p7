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
router.get("/post", auth, jsonParser, urlencodedParser, post.getPost)
router.get("/post/:id", auth, jsonParser, urlencodedParser, post.getOnePost)
router.put("/post/:id", auth, jsonParser, urlencodedParser, post.modifyPost)
router.post("/delete/:id", auth, jsonParser, urlencodedParser, post.deletePost)

module.exports = router;