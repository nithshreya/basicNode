const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    console.log("There was a Token");
    jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
      if (!err) {
        req.requesterDetails = decoded;
      }
    });
  } else {
    console.log("No Token");
  }

  next();
};