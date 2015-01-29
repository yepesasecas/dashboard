var mongo = require("mongodb");
var monk  = require("monk");
var url   = process.env.MONGOLAB_URI || "localhost:27017"
var db    = monk(url + "/dashboard");

module.exports = db;