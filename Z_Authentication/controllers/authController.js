const bcrypt = require("bcrypt");

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
  const match = await bcrypt.match(pwd, foundUser.password);
  if (match) {
    // create JWTs
    res.json({ success: `User ${user} is logged in!` });
  } else {
    res.status(401).json({
      message: `The password ${pwd} does not match!`,
    });
  }
};

module.exports = { handleLogin };
