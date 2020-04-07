const express = require('express')
const dateTime = require("simple-datetime-formater");
const app = express()
var moment = require('moment')
const event1="Joined Chat"
const event2="Disconnected Chat"

let getTime = () => {
  //var timeStamp = moment().format('MMMM Do YYYY, h:mm:ss a');
  var timeStamp = moment().format('h:mm:ss a');
  //console.log(timeStamp);
  return timeStamp;
}


//set the template engine ejs
app.set('view engine', 'ejs')

//middlewares
app.use(express.static('public'))


//routes
app.get('/', (req, res) => {
  res.render('index')
})

//Listen on port 3000
server = app.listen(3000)

//database connection
const Chat = require("./models/Chat");
const Event= require("./models/Events");
const connect = require("./dbconnect");

//socket.io instantiation
const io = require("socket.io")(server)


//listen on every connection
io.on('connection', (socket) => {
  console.log('Connected: Enter user name to begin Chat')

  //default username
  socket.username = "Anonymous"

  //listen on change_username
  socket.on('change_username', (data) => {
    socket.username = data.username
    socket.broadcast.emit('user name changed to', { username: socket.username, time: getTime() });
    console.log(`*********************************************************************`);
    console.log(data.username + " has joined the chat at" + getTime());
    console.log(`*********************************************************************`);
    connect.then(db => {
      console.log(`Successfully connected to the database: ${event1},${socket.username}`);
      let eventMessage = new Event({ event: event1, sender: socket.username });

      eventMessage.save();
    });
  })
  //listen on select chat room
  socket.on('room', (data) => {
    socket.room = data.room
    socket.broadcast.emit('User joined room', {room: socket.room} );
    console.log(`***** Joined room ` + data.room + ` *****`);
  })

  const getChats = () => socket.emit('get-chats');
  const getChatsByChatRoom =()=>socket.emit('get-chats-by-chat-room');
  const getEvents=()=>socket.emit('get-events')

  //listen on new_message
  socket.on('new_message', (data) => {
    //broadcast the new message
    io.sockets.emit('new_message', { message: data.message, username: socket.username, room: socket.room, time: getTime() });
    console.log(socket.username + " typed the following message :" + data.message + " at " + getTime());
    //save chat to the database
    connect.then(db => {
      console.log(`Successfully connected to the database: ${data.message},${socket.username},${socket.room}`);
      let chatMessage = new Chat({ message: data.message, sender: socket.username, room: socket.room });

      chatMessage.save();
    });
  })

  //listen on typing
  socket.on('typing', (data) => {
    socket.broadcast.emit('typing', { username: socket.username })
    console.log(socket.username + " is typing a message");
  })
  //get chats by Chat History
  socket.on("get-chats", () => {
    console.log("server - get-chats called");
    Chat.find((error, documents) => {
      if (error) console.log(`Error occured on Chat.find(): ${error}`);
      else {
        console.log(`Chat.find() returned documents: ${documents}`);
        const data = JSON.stringify(documents);
        socket.emit("chats-data", data);
      }

    });
  });
  //get chats by chatroom
  socket.on("get-chats-by-chat-room", () => {
    console.log("server - get-chats-by-chat-room called");
    Chat.find((error, documents) => {
      if (error) console.log(`Error occured on Chat.find(): ${error}`);
      else {
        documents.map(x=>x.room="Games");
        console.log(`Chat.find() returned documents: ${documents}`);
        const data = JSON.stringify(documents);
        socket.emit("chats-data-by-chat-room", data);
      }

    });
  });
   //get Events by User History
   socket.on("get-events", () => {
    console.log("server - get-events called");
    Event.find((error, documents) => {
      if (error) console.log(`Error occured on Event.find(): ${error}`);
      else {
        console.log(`Event.find() returned documents: ${documents}`);
        const data = JSON.stringify(documents);
        socket.emit("events-data", data);
      }

    });
  });
  socket.on("disconnect", (data) => {
    console.log(`*********************************************************************`);
    console.log(socket.username + " has disconnected from room " + socket.room  + getTime());
    console.log(`*********************************************************************`);
    connect.then(db => {
      console.log(`Successfully connected to the database: ${event2},${socket.username}`);
      let eventMessage = new Event({ event: event2, sender: socket.username });

      eventMessage.save();
    });
  });

});



