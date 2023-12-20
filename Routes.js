const express = require("express");
const path = require("path");
const router = express.Router();

// FIRST METHOD
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "subdir", "index.html"));
});

router.get("/test", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "subdir", "test.html"));
});

// SECOND METHOD
router
  .route("/")
  .get((req, res) => {})
  .post((req, res) => {})
  .put((req, res) => {})
  .delete((req, res) => {});

module.exports = router;
