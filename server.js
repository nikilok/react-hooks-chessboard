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
/* Middle ware to redirect http to https
  https://developer.ibm.com/tutorials/make-https-the-defacto-standard/
  This is only a work around until the load balancer can handle http to https redirect, on GCP.
*/
app.use(function(request, response) {
  if (!request.secure) {
    response.redirect("https://www." + request.headers.host + request.url);
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
