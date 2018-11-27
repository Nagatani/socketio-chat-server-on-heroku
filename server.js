var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/dist'));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist/index.html'));
});

io.on('connection', function( socket ){
  console.log('a user connected');
  io.emit('chat message', 'new user connected!!');
  socket.on('chat message', function( msg ){
    io.emit('chat message', msg);
  });
});

http.listen(process.env.PORT || 3000, function() {
  console.log('server listening on *:3000');
});
