const express = require("express");
const route = express.Router();
const userController = require("../controller/user");

route.use((req, res, next) => {
  next();
});

route.post("/", userController.login);

module.exports = route;
