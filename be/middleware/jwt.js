const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const header = req.get("Authorization");
  if (req.method === "OPTIONS") {
    next();
    return;
  }

  try {
    const token = header.split(" ")[1];
    const decode = jwt.verify(token, "dfklgjdgfhfghdf0");
    req.email = decode.email;
    req.name = decode.name;
    req.userId = decode.id;
    next();
  } catch (err) {
    console.log(`error msg:${err}`);
    res.status(404).json({ err });
  }
};
