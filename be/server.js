const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const user = require("./routes/users");
const post = require("./routes/post");
const auth = require("./routes/auth");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, content-type, Accept, Authorization"
  );
  next();
});

app.use(express.json());
app.use("/user", user);
app.use("/post", post);
app.use("/login", auth);

app.listen(process.env.PORT || 3001, () => {
  console.log("sever start");
});

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Successfully connected to MongoDB!");
});
