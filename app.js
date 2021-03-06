var app  = require('express')();
var http = require("http").Server(app);
var io   = require("socket.io")(http);

var orders = require("./models/orders");

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

    orders.insert(JSON.parse(order), function(err, doc){
      if(err) console.log("error inserting to db: " + err);
      if(doc) console.log(doc);
      io.emit("order event", JSON.stringify(doc));
    });
  });
});

io.on("connection", function(client){
  console.log("client connect");

  orders.all(function(err, result){
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
