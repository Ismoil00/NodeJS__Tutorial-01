const express = require("express");
const app = express(); // creating express framework instance be invoking it;
const path = require("path");

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
// * USE method runs for every incoming request:
app.use((req, res) => {
  res.status(404).sendFile("/views/404_page.html", { root: __dirname });
});

app.listen(5000, () => console.log(`Listening on port 5000`));
