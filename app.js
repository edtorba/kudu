var express = require('express');
var app     = express();
var http    = require('http').Server(app);
var io      = require('socket.io')(http);
var code    = require('./components/code');
var gameRooms = require('./components/gameRooms');

// Make "public" folder publicly accessible
app.use(express.static(__dirname + '/public'));

// Routes
require('./components/routes')(app);

io.on('connection', function(socket) {

    // User connected or disconnected block
    console.log('a user connected: ' + socket.id);
    socket.on('disconnect', function() {
        console.log('user disconnect: ' + socket.id);
    });

    // Create room
    socket.on('createRoom', function() {
        var roomCode = code.generate(5, '#aA');

        // Add new room to our list
        gameRooms.create(roomCode);

        // Attach room name to a socket
        socket.roomCode = roomCode;

        // Join room
        socket.join(roomCode);

        // Send to current request socket client
        socket.emit('connecting', roomCode);
    });

    // Join room
    socket.on('joinRoom', function(roomCode) {
        
        // Check if room exists
        if (gameRooms.exists(roomCode)) {
            console.log('Room exists');
        } else {
            console.log('Room does not exist');
        }
    });
});

http.listen(3000, function() {
    console.log('Listening on *:3000');
});