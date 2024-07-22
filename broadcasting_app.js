var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');

app.get('/', function(req, res){
   res.sendFile(path.join(__dirname, 'broadcasting.html'));
});

var clients = 0;

io.on('connection', function(socket){
   clients++;
   io.sockets.emit('broadcast', { description: clients + ' clients connected!' });
   console.log(clients + ' clients connected!');

   socket.on('disconnect', function () {
      clients--;
      io.sockets.emit('broadcast', { description: clients + ' clients connected!' });
      console.log(clients + ' clients connected!');
   });
});

http.listen(4000, function(){
   console.log('listening on localhost:4000');
});
