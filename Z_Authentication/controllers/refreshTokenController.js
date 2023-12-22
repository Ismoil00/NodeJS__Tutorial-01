const jwt = require("jsonwebtoken");
require("dotenv").config;

// state handler
const usersDB = {
  users: require("../models/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

// REFRESH TOKEN
const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;

  // if cookie is not found:
  if (!cookies?.jwt) return res.sendStatus(401);

  console.log("COOKIES", cookies.jwt);
  const refreshToken = cookies.jwt;

  // we check if a user has a refreshtoken:
  const foundUserRefreshToken = usersDB.users.find(
    (person) => person.refreshToken === refreshToken
  );
  if (!foundUserRefreshToken)
    return res.status(403).json({
      message: `The user ${user} is Forbidden!`,
    });

  // evaluate jwt:
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || foundUserRefreshToken.username !== decoded.username)
      return res.sendStatus(403);

    const accessToken = jwt.sign(
      { username: decoded.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30s" }
    );
    res.json({ accessToken });
  });
};

module.exports = { handleRefreshToken };
