const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const header = req.get("Authorization");
  const token = header.split(" ")[1];
  try {
    const decode = jwt.verify(token, "dfklgjdgfhfghdf0");
    req.email = decode.email;
    req.userId = decode.id;
    next();
  } catch (err) {
    res.status(404).json({ err });
  }
};
