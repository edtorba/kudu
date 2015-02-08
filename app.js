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

            // Check if room exists
            if (gameRooms.exists(roomCode)) {
                // Check if client was a room owner
                if (gameRooms.list[socket.roomCode].owner == socket.id) {

                    // Leave room
                    socket.leave(socket.roomCode);

                    // Destroy game
                    gameRooms.destroy(socket.roomCode);

                    // Client was a room owner, now we have to kick evryone else
                    io.to(socket.roomCode).emit('ownerLeft', {
                        'status': null,
                        'error': 'Room owner has left the game. The game connection has been lost.'
                    });
                } else if (gameRooms.list[socket.roomCode].inList(socket.id)) {
                    // Client was a player within a room X, so we have to remove him
                    gameRooms.list[socket.roomCode].killClient(socket.id);

                    // Leave room
                    socket.leave(socket.roomCode);

                    // Sending number of connected people to owner
                    socket.broadcast.to(gameRooms.list[socket.roomCode].owner).emit(
                        'connectedPeople',
                        gameRooms.list[socket.roomCode].people.length
                    );
                }
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

            // Check if room is locked
            if (!gameRooms.list[roomCode].locked) {

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
                // Locked
                // Send to current request socket client response message
                socket.emit('joinRoomStatus', {
                    'status': false,
                    'error': 'Too late, sorry, room is locked.'
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

    // Lock room and allow clients to select vehicle
    socket.on('waitingForCars', function() {

        // Check if client was part of the group
        if (typeof socket.roomCode !== 'undefined') {

            // Check if room exists
            if (gameRooms.exists(socket.roomCode)) {

                // Check if client was a room owner
                if (gameRooms.list[socket.roomCode].owner == socket.id) {

                    // Lock room
                    gameRooms.list[socket.roomCode].lock();

                    // Move clients to select vehicle state
                    // Client was a room owner, now we have to kick evryone else
                    io.to(socket.roomCode).emit('switchToSelectVehicle', {
                        'status': true,
                        'error': null
                    });
                }
            }
        }
    });
});

http.listen(3000, function() {
    console.log('Listening on *:3000');
});