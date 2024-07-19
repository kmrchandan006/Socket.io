var express = require('express');
var http = require('http');
var path = require('path');
var socketIo = require('socket.io');

// Initialize Express app
var app = express();

// Create an HTTP server using the Express app
var server = http.createServer(app);

// Initialize Socket.IO to work with the HTTP server
var io = socketIo(server);

// Serve the index.html file when the root URL is accessed
app.get('/', function(req, res) {
    var options = {
        root: path.join(__dirname) // Set the root directory for the file
    };
    var fileName = 'index1.html';
    res.sendFile(fileName, options); // Send the index.html file to the client
});

// Handle WebSocket connections
io.on('connection', function(socket) {
    console.log('A user connected');
    socket.emit('message', 'Welcome to the chat!'); // Send a welcome message to the connected user

    // Notify all users about a new connection
    socket.broadcast.emit('message', 'A user has connected');

    // Handle disconnection
    socket.on('disconnect', function() {
        console.log('A user disconnected');
        io.emit('message', 'A user has disconnected'); // Notify all users about the disconnection
    });
});

// Start the server and listen on port 3000
server.listen(5000, function() {
    console.log('listening on *:3000');
});
