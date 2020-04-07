$(function () {
	//make connection
	var socket = io.connect('http://localhost:3000')

	//buttons and inputs
	var message = $("#message")
	var username = $("#username")
	var send_message = $("#send_message")
	var send_username = $("#send_username")
	var chatroom = $("#chatroom")
	var feedback = $("#feedback")
	var getChats = $("#getChats")
	var getChatsByChatRoom = $("#getChatsByChatRoom")
	var getEvents = $("#getEvents")
	var room = $("#room")




	socket.on('connect', function () {
		console.log('Connected: Enter user name to begin chat');
	});
	socket.on('disconnect', function () {
		console.log(`*********************************************************************`);
		console.log(socket.username + " has disconnected from " + room.val());
		console.log(`*********************************************************************`);
	});
	//get saved chats
	getChats.click(function () {

		socket.emit('get-chats')
	})

	//get saved chats by chat room
	getChatsByChatRoom.click(function () {

		socket.emit('get-chats-by-chat-room')
	})

	//get saved events by User History
	getEvents.click(function () {

		socket.emit('get-events')
	})

	//Emit message
	send_message.click(function () {
		socket.emit('new_message', { message: message.val() })
	})

	//Listen on new_message
	socket.on("new_message", (data) => {
		feedback.html('');
		message.val('');
		chatroom.append("<p class='message'>" + data.username + ": " + data.message + "<br>" + data.time + "</p>")

		console.log(`${data.username} typed the following message: ${data.message} at ${data.time}`);
	})

	//Emit a username
	send_username.click(function () {
		socket.emit('change_username', { username: username.val() });
		socket.emit('room', { room: room.val() });
		console.log(`*********************************************************************`);
		console.log(`${username.val()} has joined the chatroom ${room.val()}`);
		console.log(`*********************************************************************`);
	})
	//Listen on typing
	socket.on('change_username', (data) => {
		feedback.html("<p><i>" + data.username + " has joined the chat at" + data.time + "</i></p>")
	})

	//Emit typing
	message.bind("keypress", () => {
		socket.emit('typing')
		console.log("Typing a new message");
	})

	//Listen on typing
	socket.on('typing', (data) => {
		feedback.html("<p><i>" + data.username + " is typing a message..." + "</i></p>")

	})

	// set up chat socket event handlers here..
	socket.on('chats-data', function (data) { console.log(`chat data received from server: ${data}`) });

	// set up chat data by chatroom socket event handlers here..
	socket.on('chats-data-by-chat-room', function (data) { console.log(`chat data by chat room received from server: ${data}`) });
	// set up event data for user history socket event handlers here..
	socket.on('events-data', function (data) { console.log(`Events data by User History received from server: ${data}`) });


});


