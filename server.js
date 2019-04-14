/**
 * Web Server for production
 */
const express = require("express");
const path = require("path");
const compression = require("compression");
const app = express();
const port = process.env.PORT || 9000;

app.use(compression());
app.use(express.static(path.join(__dirname, "build")));

/* TODO: Temporary solution, to redirect all traffic to https.
 Will setup these redirects later on at the laodbalancer level, as it performs better when under heavy load. 
 https://developer.ibm.com/tutorials/make-https-the-defacto-standard/
 */
app.use(function(request, response) {
  if (!request.secure) {
    response.redirect("https://wwww." + request.headers.host + request.url);
  }
});

app.get("/robots.txt", function(req, res) {
  res.sendFile(path.join(__dirname, "build", "robots.txt"));
});

app.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

console.log("Listening On: port", port);
app.listen(port);
