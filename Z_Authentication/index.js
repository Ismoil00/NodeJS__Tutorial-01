const express = require("express");
const registerController = require("./controllers/registerController");

const app = express();
app.use(express.json());

app.post("/register", registerController.handleNewUser);

app.listen(6000, () => console.log("Listening on port 6000"));
