const logEvents = require("./LogEvents");
const EventEmitter = require("events");

class MyEmitter extends EventEmitter {}

// initialize object
const myEmitter = new MyEmitter();

// add listener for the event
myEmitter.on("log", (msg) => logEvents(msg));

// Emit event
setTimeout(() => {
  myEmitter.emit("log", "Log event emitted!");
}, 2000);
