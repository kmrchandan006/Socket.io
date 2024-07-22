 var express = require('express');
var http = require('http');
var socketIo = require('socket.io');

var app = express();
var server = http.createServer(app);
var io = socketIo(server);

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/Error_Handling.html');
});

var roomno = 1;

io.on('connection', function(socket) {
    socket.on('error', function(err) {
        console.error('Socket error:', err);
    });

    socket.on('someEvent', function(data) {
        try {
            // Handle the event
        } catch (err) {
            console.error('Error handling someEvent:', err);
            socket.emit('error', 'An error occurred while processing your request.');
        }
    });

    socket.on('disconnect', function(reason) {
        console.log('Socket disconnected due to:', reason);
    });
    
    socket.join("room-" + roomno);
    io.to("room-" + roomno).emit('connectToRoom', "You are in room no. " + roomno);
});

server.listen(3000, function() {
    console.log('listening on localhost:3000');
});
