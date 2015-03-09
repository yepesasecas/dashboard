"use strict";

var request = require("request");
var _ = require("underscore");

var Order = require("./models/order");

var options = {
  json: {},
  method: "POST",
  //url: "http://bongodash.herokuapp.com"
  url: "http://localhost:3000"
}

var request_time = [10, 40];

function _request(){

  options.json = Order.random();

  request(options, function(err){
    if(err) console.log(err);
    console.log(options.json);
    setTimeout(_request, _.sample(request_time));
  });
};

_request();
