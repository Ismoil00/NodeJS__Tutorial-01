const bcrypt = require("bcrypt");
const path = require("path");
const fsPromise = require("fs").promises;
const jwt = require("jsonwebtoken");
require("dotenv").config;

// state handler
const usersDB = {
  users: require("../models/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

// LOGIN
const handleLogin = async (req, res) => {
  const { user, pwd } = req.body;

  // if username or password is not provided:
  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "Username and Password are required!" });

  // we check if a user is registered or not:
  const foundUser = usersDB.users.find((person) => person.username === user);
  if (!foundUser)
    return res.status(401).json({
      message: `The user ${user} is not registered!\nPlease, go and register first!`,
    });

  // evaluate password:
  const match = await bcrypt.compare(pwd, foundUser.password);
  if (match) {
    // create JWTs:
    const accessToken = jwt.sign(
      { username: foundUser.username }, // payload/body
      process.env.ACCESS_TOKEN_SECRET, // secret
      { expiresIn: "30s" } // optional (time expiration)
    );
    const refreshToken = jwt.sign(
      { username: foundUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );
    const otherUsers = usersDB.users.filter(
      (person) => person.username !== foundUser.username
    );
    const currentUser = { ...foundUser, refreshToken };

    // we save authenticated user with his/her refresh token:
    usersDB.setUsers([...otherUsers, currentUser]);
    await fsPromise.writeFile(
      path.join(__dirname, "..", "models", "users.json"),
      usersDB.users
    );

    // httpOnly - makes the jwt unavialable in cookie;
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ accessToken }); // we must store this jwt in memory but not in localstorage/coockie;
  } else {
    res.status(401).json({
      message: `The password ${pwd} does not match!`,
    });
  }
};

module.exports = { handleLogin };
