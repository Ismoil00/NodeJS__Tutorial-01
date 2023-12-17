const http = require("http");
const fs = require("fs");
const l = require("lodash");

// serving the following ports:
const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "text/html");

  let path = "./views/";
  switch (req.url) {
    case "/":
      path += "index.html";
      res.statusCode = 200;
      break;
    case "/brothers":
      path += "brothers.html";
      res.statusCode = 200;
      break;
    case "/my-brothers":
      res.statusCode = 301;
      res.setHeader("Location", "/brothers"); // redirection endpoint to another;
      res.end();
      break;
    default:
      path += "404_page.html";
      res.statusCode = 404;
      break;
  }

  fs.readFile(path, (err, data) => {
    try {
      if (err) throw new Error("ERROR!!!");
      // res.write(data); // if there is one data to write then we can insert it inside res.end();
      res.end(data);
    } catch (err) {
      console.log(err);
      res.end();
    }
  });
});

// listening to the following ports:
server.listen(4000, "localhost", () => console.log("listening to port 4000"));
