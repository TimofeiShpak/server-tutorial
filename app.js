const express = require("express");
const app = express();
const MongoClient = require("mongodb").MongoClient;
const objectId = require("mongodb").ObjectId;
app.use(express.static(__dirname + "/public"));
// import the routes file
const routes = require("./routes/routes")

// body parser configuration
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// register the routes 
app.use('/', routes);

module.exports = app;
