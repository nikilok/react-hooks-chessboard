/**
 * Web Server for production
 */
const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 9000;

app.use(express.static(path.join(__dirname, "build")));

app.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

console.log("Listening On: port", port);
app.listen(port);
