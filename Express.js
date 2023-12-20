const express = require("express");
const app = express(); // creating express framework instance be invoking it;
const path = require("path");
const cors = require("cors");

/*-----------------------------------------------*
 *                                               *
 *                  MIDDLEWARES                  *
 *                                               *
 *-----------------------------------------------*/

// there are 3 types of middlewares:
// 3) Third-party middlewares;

// 1) BUILT-IN MIDDLEWARES:
app.use(express.json()); // for handling json files
app.use(express.urlencoded({ extended: false }));
app.use("/", express.static(path.join(__dirname, "/views/images"))); // serving static files
app.use("/subdir", express.static(path.join(__dirname, "/views/images"))); // serving static files for subdir

// Cross Origin Resources Sharing
const whilelist = [
  "https://www.google.com",
  "http://127.0.0.1:5000",
  "http://localhost:5000",
];
const corsOptions = {
  origin: (origin, callback) => {
    if (whilelist.indexOf(origin) !== -1 || !origin) callback(null, true);
    else callback(new Error("Not allowed by CORS"));
  },
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use("/subdir", require("./Routes")); // ADDING ROUTES;

// 2) CUSTOM MIDDLEWARES
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

/*-----------------------------------------------*
 *                                               *
 *                  EXPRESS JS                   *
 *                                               *
 *-----------------------------------------------*/

// THE BENEFITS OF EXPRESS OVER SIMPLE HTTP PACKAGE:
// 1) This one does res.setHeader("Content-Type", "text/html");
// 2) Statuscode is set automatically;

// sending HTML Files:
app.get("/", (req, res) => {
  res.sendFile("./views/index.html", { root: __dirname }); // we pass the root because express uses the global pathing by default
});

// sending HTML Files:
app.get("/brothers", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "brothers.html"));
});

// redirection:
app.get("/my-brothers", (req, res) => {
  res.redirect("/brothers");
});

// several route-handlers:
app.get(
  "/hello",
  (req, res, next) => {
    console.log("First Handler Before NEXT");
    next();
  },
  (req, res) => {
    res.send("Hello World!");
  }
);

// CHAIN OF HANDLERS:
const one = (req, res, next) => {
  console.log("ONE");
  next();
};
const two = (req, res, next) => {
  console.log("TWO");
  next();
};
const three = (req, res) => {
  console.log("THREE");
  res.send("CHAIN OF HANDLERS!");
};

app.get("/chain-of-handlers", [one, two, three]);

// 404 page:
app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile("/views/404_page.html", { root: __dirname });
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.listen(5000, () => console.log(`Listening on port 5000`));
