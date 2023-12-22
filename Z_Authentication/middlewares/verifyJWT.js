const jwt = require("jsonwebtoken");
require("dotenv").config;

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader)
    return res.status(401).json({ ERROR: "You Are Not Authorized!" });

  console.log("Authorization Header", authHeader);

  const token = authHeader.split(" ")[1]; // Bearer token
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ ERROR: "Invalid Token" });

    req.user = decoded.username;
    next();
  });
};

module.exports = verifyJWT;
