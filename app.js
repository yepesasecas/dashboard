var app  = require('express')();
var http = require("http").Server(app);
var io   = require("socket.io")(http);

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
    io.emit("order event", order);
  });
});

io.on("connection", function(client){
  console.log("client connect");

  client.on("disconnect", function(){
    console.log("client disconnect");
  });
});

var server = http.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('listening at http://%s:%s', host, port);
});
