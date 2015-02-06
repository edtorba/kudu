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
        console.log('User disconnected: ' + socket.id);

        // Check if client was part of the group
        if (typeof socket.roomCode !== 'undefined') {
            // Check if client was a room owner
            if (gameRooms.list[socket.roomCode].owner == socket.id) {
                // Client was a room owner we have to kick evryone else

                // TODO
            } else if (gameRooms.list[socket.roomCode].inList(socket.id)) {
                // Client was a player within a room X, so we have to remove him
                gameRooms.list[socket.roomCode].killClient(socket.id);

                // Sending number of connected people to owner
                socket.broadcast.to(gameRooms.list[socket.roomCode].owner).emit(
                    'connectedPeople',
                    gameRooms.list[socket.roomCode].people.length
                );
            }
        }
    });

    // Create room
    socket.on('createRoom', function() {
        var roomCode = code.generate(5, '#aA');

        // Add new room to our list
        gameRooms.create(roomCode, socket.id);

        // Attach room code to a socket
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

            // Check if client is already in room
            if (!gameRooms.list[roomCode].inList(socket.id)) {
                // Attach room code to a socket
                socket.roomCode = roomCode;

                // Join room
                socket.join(roomCode);

                // Add client to list
                gameRooms.list[roomCode].addClient(socket.id);

                // Send to current request socket client response message
                socket.emit('joinRoomStatus', {
                    'status': true,
                    'error': null
                });

                // Sending number of connected people to owner
                socket.broadcast.to(gameRooms.list[roomCode].owner).emit(
                    'connectedPeople',
                    gameRooms.list[roomCode].people.length
                );
            } else {
                // Send to current request socket client response message
                socket.emit('joinRoomStatus', {
                    'status': false,
                    'error': 'Client is already part of that group'
                });
            }
        } else {
            // Send to current request socket client response message
            socket.emit('joinRoomStatus', {
                'status': false,
                'error': 'Wrong room code'
            });
        }
    });
});

http.listen(3000, function() {
    console.log('Listening on *:3000');
});