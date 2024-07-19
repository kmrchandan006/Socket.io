var express = require('express');
var http = require('http');
var path = require('path');
var socketIo = require('socket.io');
const { setTimeout } = require('timers/promises');

// Initialize Express app and HTTP server
var app = express();
var server = http.createServer(app);
var io = socketIo(server);    

// Serve the index.html file on the root path
app.get('/', function(req, res){
    var options = {
        root: path.join(__dirname)
    };   
    var fileName = 'index.html';
    res.sendFile(fileName, options);
});

// Handle socket connection
io.on('connection', function(socket){
    console.log('A user connected');

    setTimeout(function(){
        socket.send('send  message from server side by prereserved event');
    },3000);

    // Handle disconnection
    socket.on('disconnect', function(){
        console.log('A user disconnected');
    });
});

// Start the server and listen on port 3000
server.listen(3000, function() {
    console.log('listening on *:3000');
});
