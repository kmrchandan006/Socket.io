var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');

app.get('/', function(req, res){
   res.sendFile(path.join(__dirname, 'Hello_world.html'));
});

io.on('connection', function(socket){
   console.log('A user connected');

   // Send a message after a timeout of 4 seconds
   setTimeout(function(){
      socket.send('Sent a message 4 seconds after connection!');
   }, 4000);

   socket.on('disconnect', function () {
      console.log('A user disconnected');
   });
});

http.listen(3000, function(){
   console.log('listening on *:3000');
});
