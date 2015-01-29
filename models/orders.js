var db = require("../lib/mongodb");

var _all = function(callback){
  db.get("orders").find({}, callback);
};

var _insert = function(order, callback){
  order.created_at = Date.now();
  _remove(order, function(err, doc){
    if(err) console.log("error removing from db: " + err);
    db.get("orders").insert(order, callback);
  });
};

var _remove = function(order, callback){
  db.get("orders").remove({id: order.id}, callback);
};


exports.all    = _all;
exports.insert = _insert;
exports.remove = _remove;