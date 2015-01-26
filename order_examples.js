"use strict";

var request = require("request");
var Order = require("./models/order");

var options = {
  json: {},
  method: "POST",
  url: "http://localhost:3000"
}

function _request(){

  options.json = Order.random();

  request(options, function(err){
    if(err) console.log(err);
    setTimeout(_request, 1000);
  });
};

_request();
