const http = require("http");
const path = require("path");
const fs = require("fs");
const fsPromises = require("fs").promises;
const logEvents = require("./LogEvents");
const EventEmitter = require("events");

class Emitter extends EventEmitter {}
const emitter = new Emitter();
const PORT = process.env.PORT || 3500;

const server = http.createServer((req, res) => {
  const extension = path.extname(req.url);
  let contentType;

  switch (extension) {
    case ".css":
      contentType = "text/css";
      break;
    case ".js":
      contentType = "text/javascript";
      break;
    case ".json":
      contentType = "application/json";
      break;
    case ".jpg":
      contentType = "image/jpeg";
      break;
    case ".png":
      contentType = "image/png";
      break;
    case ".txt":
      contentType = "text/plain";
      break;
    default:
      contentType = "text/html";
  }

  let filePath =
    contentType === "text/html" && req.url === "/"
      ? path.join(__dirname, "views", "index.html")
      : contentType === "text/html" && req.url.slice(-1) === "/"
      ? path.join(__dirname, "views", req.url, "index.html")
      : contentType === "text/html"
      ? path.join(__dirname, "views", req.url)
      : path.join(__dirname, req.url);
});

server.listen(PORT, () => console.log(`Server listening on ${PORT}`));

// // add listener for the event
// emitter.on("log", (msg) => logEvents(msg));

// // Emit event
// myEmitter.emit("log", "Log event emitted!");