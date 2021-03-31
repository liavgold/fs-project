const express = require("express");
const route = express.Router();
const userController = require("../controller/user");

route.post("/", userController.login);

module.exports = route;
