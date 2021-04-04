const express = require("express");
const route = express.Router();
const usrController = require("../controller/user");
const jwt = require("../middleware/jwt");

route.use((req, res, next) => {
  console.log("in user route", req.body);
  next();
});
route.post("/", usrController.register);

route.use(jwt);

route.get("/", usrController.readUser);

module.exports = route;
