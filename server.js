const express = require("express");
const fs = require("fs");
var fsPath = require('fs-path');
const app = express();
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json, queen 
app.use(bodyParser.json())

var filelist = require("./files/filelist.json");
var latestVersion = require("./files/latestVersion.json");
var songs = require("./files/songs.json");

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

// im here bitch 
app.get(
  "/jdc-web/jdc/client/app_35/1.2.13274/PC/filelist.json",
  (req, res) => {
    res.send(filelist);
  }
);

app.get(
  "/game/latestVersion",
  (req, res) => {
    res.send(latestVersion);
  }
);

app.get(
  "/game/settings",
  (req, res) => {
    res.send(songs);
  }
);

function checkHttps(req, res, next) {
  if (req.get("X-Forwarded-Proto").indexOf("https") != -1) {
    return next();
  } else {
    res.redirect("https://" + req.hostname + req.url);
  }
}

app.all("*", checkHttps);
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(request, response) {
  response.sendFile(__dirname + "/views/index.html");
});

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
