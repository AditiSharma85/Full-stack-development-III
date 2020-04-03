const http = require("http"),
  url = require("url"),
  fs = require("fs"),
  io = require("socket.io");
const mongoose = require("mongoose");
//const connectionString="mongodb+srv://aditiSharma85:<password>@cluster0-qmzao.azure.mongodb.net/test?retryWrites=true&w=majority";
const connectionString="mongodb://aditiSharma85:Green%40pple2020@cluster0-shard-00-00-qmzao.azure.mongodb.net:27017,cluster0-shard-00-01-qmzao.azure.mongodb.net:27017,cluster0-shard-00-02-qmzao.azure.mongodb.net:27017/AditiDB?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority";
mongoose.connect(connectionString,{
  userNewUrlParser: true,
  useUnifiedTopology: true
}).then(
  ()=>{
    console.log("Mongoose connected successfully");
  },
  error=>{
    console.log("Mongoose could not connect to the database" +error);
  }
);
const Restaurant=require("./model/Restaurant");
const Order=require("./model/Order");
const server = http.createServer(function(req, res) {
  var path = url.parse(req.url).pathname;
  switch (path) {
    case "/":
      fs.readFile(__dirname + "/index.html", function(err, data) {
        if (err) return send404(res);
        res.writeHead(200, {
          "Content-Type": path == "json.js" ? "text/javascript" : "text/html"
        });
        res.write(data, "utf8");
        res.end();
      });
      break;

    default:
      send404(res);
  }
});
const send404 = function(res) {
  res.writeHead(404);
  res.write("404");
  res.end();
};

const PORT = 8080;
server.listen(PORT, () => console.log(`server started on localhost:${PORT}`));

// socket.io, I choose you
const ioServer = io.listen(server);

var addOrder=new Order({
  item: "Cookie",
  customer_name: "ADS"
});

// socket.io setup and manager
ioServer.on("connection", function(socket) {
  // now we have a client object!
  console.log("Connection accepted.");

  // event listeners
  socket.on("message", function(message) {
    console.log(`Recieved message: ${message} - from client`);
    socket.emit("msgreceived");
  });

  socket.on("disconnect", function() {
    console.log("Disconnected...");
  });

  
    socket.on("get-restaurants", () => {
      console.log("server - get-restarants called");
        Restaurant.find((error,documents)=>{
        if(error) console.log(`Error occured on Restaurant.find(): ${error}`);
        else{
            documents.map(x=>x.city="Queens");
            documents.map(x=>x.cuisine="Delicatessen");
                    
          console.log(`Restaurant.find() returned documents: ${documents}`);
          const data=JSON.stringify(documents);
          socket.emit("restaurants-data",data);
        }
     
      });
  });

  socket.on("get-orders", () => {
    console.log("server - get-orders called");
    Order.find((error,documents)=>{
      if(error) console.log(`Error occured on Order.find(): ${error}`);
      else{
        console.log(`Order.find() returned documents: ${documents}`);
        const data=JSON.stringify(documents);
        socket.emit("orders-data",data);
      }
    });
});

socket.on("add-orders", () => {
  console.log("server - add-orders called");
  addOrder.save((error,addOrder)=>{
    if(error) console.log(`Error occured on Add-Order.find(): ${error}`);
    else{
      console.log(`Add-Order documents to be saved: ${addOrder}`);
      const data=JSON.stringify(addOrder);
      socket.emit("order-data-added",data);
    }
  });
});
});
