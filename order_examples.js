"use strict";

var request = require("request");
var Order = require("./models/order");

var options = {
  json: {},
  method: "POST",
  //url: "http://bongodash.herokuapp.com"
  url: "http://localhost:3000"
}

function _request(){

  options.json = Order.random();

  request(options, function(err){
    if(err) console.log(err);
    console.log(options.json);
    setTimeout(_request, 1000);
  });
};

_request();
