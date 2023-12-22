const express = require("express");
const verifyJWT = require("./middlewares/verifyJWT");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cookieParser()); // middleware for cookies;

// app.post("/register", registerController.handleNewUser);
app.use("/register", require("./routes/register"));
app.use("/auth", require("./routes/auth"));
app.use("/refresh", require("./routes/refresh"));
app.use(verifyJWT);

app.listen(6000, () => console.log("Listening on port 6000"));
