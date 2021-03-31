const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.readUser = async (req, res, next) => {
  const email = req.email;
  const user = await User.findOne({ email: email }, { password: 0 });

  if (!user) {
    res.status(404).json({ msg: `user with email ${email} was not found` });
    return;
  }
  res.json({ user });
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  const foundUser = await User.findOne({ email: email });

  console.log(foundUser);
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
  const token = jwt.sign(
    {
      email: foundUser._doc.email,
      id: foundUser._doc._id.toString(),
    },
    "dfklgjdgfhfghdf0",
    { expiresIn: "8h" }
  );

  res.json({ token });
};

exports.register = async (req, res, next) => {
  const { user } = req.body;
  const hashedPassword = await bcrypt.hash(user.password, 10);
  const newUser = new User({ ...user, password: hashedPassword });
  const createdUser = await newUser.save();
  res.json({
    user: {
      ...createdUser._doc,
      _id: createdUser._doc._id.toString(),
      password: "",
    },
  });
};
