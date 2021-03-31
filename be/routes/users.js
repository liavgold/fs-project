const express = require("express");
const route = express.Router();
const usrController = require("../controller/user");
const jwt = require("../middleware/jwt");

route.use(jwt);

route.get("/", usrController.readUser);

route.post("/", usrController.register);

module.exports = route;
