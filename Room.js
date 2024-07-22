 var app = require('express')();
 var express = require('express');
var http = require('http');
var socketIo = require('socket.io');

var app = express();
var server = http.createServer(app);
var io = socketIo(server);

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/Room.html');
});

var roomno = 1;

io.on('connection', function(socket) {
    socket.join("room-" + roomno);
    // Send this event to everyone in the room.
    io.to("room-" + roomno).emit('connectToRoom', "You are in room no. " + roomno);
});

server.listen(3000, function() {
    console.log('listening on localhost:3000');
});
