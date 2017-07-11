// setup dependencies
var express = require("express");
var bodyParser = require("body-parser");

// Sets up the Express App
var app = express();
var port = process.env.PORT || 8080;

// Requiring our models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Static directory
// makes everything in the public folder accessible. Usually the public folder contains client side .css and .js
app.use(express.static("public"));


// Routes
// =============================================================
require("./routes/api-routes.js")(app);

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({ force: true }).then(function() {
  app.listen(port, function() {
    console.log("App listening on PORT " + port);
  });
});