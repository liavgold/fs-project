const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

let emailExist = async (email) => {
  const result = await User.findOne({ email });
  return result;
};

exports.readUser = async (req, res, next) => {
  const email = req.email;
  const userExsit = await emailExist(email);
  if (!userExsit) {
    res.status(404).json({ msg: `user with email ${email} was not found` });
    return;
  }
  res.json({ user: userExsit._doc });
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
    if (
      !email||
      email.length === 0 ||
      !password ||
      password.length === 0
    )
      return res.status(400).json({ msg: "bad request" });
  const foundUser = await emailExist(email);

  if (!foundUser) {
    res.status(404).json({ msg: `user with email ${email} was not found` });
    return;
  }
  const passwordResult = await bcrypt.compare(
    password,
    foundUser._doc.password
  );
  if (!passwordResult) {
    res.status(403).json({ msg: `email or password is incorrect ` });
    return;
  }
  console.log(
    `${foundUser._doc.email} is login userID: ${foundUser._doc._id}`
  );
  const token = jwt.sign(
    {
      email: foundUser._doc.email,
      name: foundUser._doc.name,
      id: foundUser._doc._id.toString(),
    },
    "dfklgjdgfhfghdf0",
    { expiresIn: "8h" }
  );

  res.json({ token, email: foundUser._doc.email, name: foundUser._doc.name });
};

exports.register = async (req, res, next) => {
  const { user } = req.body;
      if (
        !user.email ||
        user.email.length === 0 ||
        !user.password ||
        user.password.length === 0 ||
        !user.name ||
        user.name.length === 0
      )
        return res.status(400).json({ msg: "bad request" });
  const userExsit = await emailExist(user.email);
  console.log(userExsit);
  if (userExsit) {
    res.status(400).json({ msg: "You are already a user. Please log in." });
    return;
  }
  const hashedPassword = await bcrypt.hash(user.password, 10);
  const newUser = new User({ ...user, password: hashedPassword });
  const createdUser = await newUser.save();
  res.status(201).json({
    user: {
      ...createdUser._doc,
      _id: createdUser._doc._id.toString(),
      password: "",
    },
  });
};
