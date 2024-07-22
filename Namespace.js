var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');

// Serve the HTML file
app.get('/', function(req, res){
   res.sendFile(path.join(__dirname, 'Namespace.html')); // Ensure the file is in the same directory as this script
});

// Set up the namespace
var nsp = io.of('/my-namespace');
nsp.on('connection', function(socket){
   console.log('someone connected to /my-namespace');
   nsp.emit('hi', 'Hello everyone!');
});

// Start the server
http.listen(4000, function(){
   console.log('listening on localhost:4000');
});
