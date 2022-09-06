const auth = require("../../middlewares/auth")
const express = require("express")
const router = express.Router();
const app = express();

const jsonParser = app.use(express.json());
const urlencodedParser =  app.use(express.urlencoded({extended: false}));
router.get("/home", auth, jsonParser, urlencodedParser)