const express = require("express");
const route = express.Router();
const postController = require("../controller/posts");
const jwt = require("../middleware/jwt");

route.use(jwt);

route.get("/", postController.getPosts);

route.post("/", postController.addPost);

module.exports = route;
