const fsPromise = require("fs").promises;
const path = require("path");
const bcrypt = require("bcrypt");

// state handler
const usersDB = {
  users: require("../models/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const handleNewUser = async (req, res) => {
  const { user, pwd } = req.body;

  // if username or password is not provided:
  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "Username and Password are required!" });

  // check for duplicate username in the db
  const dublicate = usersDB.users.find((person) => person.username === user);
  if (dublicate)
    return res.status(409).json({ message: `The user ${user} already exists` });

  // store the new user
  try {
    const hashedPwd = await bcrypt.hash(pwd, 10); // encrypt the password
    const newUser = { username: user, password: hashedPwd };
    usersDB.setUsers([...usersDB.users, newUser]);
    await fsPromise.writeFile(
      path.join(__dirname, "..", "models", "users.json"),
      JSON.stringify(usersDB.users)
    );

    res.status(201).json({ success: `New user ${user} created successfully!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleNewUser };
