const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  console.log(req.headers.authorization);
  const token = req.headers.authorization;
  console.log(req.headers.authorization);
  if (token) {
    console.log("There was a Token");
    jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
      if (!err) {
        req.requesterDetails = decoded;
        console.log(decoded)
        next();
      }
      else{
        console.log(err)
      }
    });
  } else {
    console.log("No Token");
  }
};