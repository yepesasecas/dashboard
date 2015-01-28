var app  = require('express')();
var http = require("http").Server(app);
var io   = require("socket.io")(http);

var mongo = require("mongodb");
var monk  = require("monk");
var db    = monk("localhost:27017/dashboard");

app.set("port", (process.env.PORT || 3000));

app.get('/', function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.post("/", function(req, res){
  var order = "";

  req.on("data", function(data){
    order += data;
  });

  req.on("end", function(){
    console.log("Order event: " + order);
    res.end(order);


    orders    = db.get("orders");
    orderJSON = JSON.parse(order);

    orders.remove({id: orderJSON.id}, function(err, doc){
      if(err) console.log("error removing from db: " + err);

      orders.insert(orderJSON, function(err, doc){
        if(err) console.log("error inserting to db: " + err);
        if(doc) console.log(doc);
      
        io.emit("order event", order);
      });
    });
  });
});

io.on("connection", function(client){
  console.log("client connect");

  // client.emit("order event", JSON.stringify({"id": "1234", "status": "t", "partner": "overs"}));

  orders = db.get("orders");
  orders.find({}, function(err, result){
    if(err) console.log("error getting orders from DB :" + err);
    result.forEach(function(order){
      client.emit("order event", JSON.stringify(order));
    });
  });


  client.on("disconnect", function(){
    console.log("client disconnect");
  });
});

var server = http.listen(app.get("port"), function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('listening at http://%s:%s', host, port);
});
