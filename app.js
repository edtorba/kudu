var express = require('express');
var app     = express();
var http    = require('http').Server(app);
var io      = require('socket.io')(http);
var code    = require('./classes/code');
var Rooms   = require('./classes/rooms');
var rooms   = new Rooms();
var Cars    = require('./classes/cars');
var cars    = new Cars();
// Initialise cars
cars.init();

// Make "public" folder publicly accessible
app.use(express.static(__dirname + '/public'));

// Routes
require('./classes/routes')(app);

io.on('connection', function(socket) {

    // User connected or disconnected block
    console.log('a user connected: ' + socket.id);

    socket.on('disconnect', function() {
        console.log('User disconnected: ' + socket.id);

        // Check if client was part of the group
        if (typeof socket.roomCode !== 'undefined') {

            // Check if room exists
            if (rooms.exists(socket.roomCode)) {

                // Check if client was a room owner
                if (rooms.list[socket.roomCode].isOwner(socket.id)) {

                    // Leave room
                    socket.leave(socket.roomCode);

                    // Destroy game
                    rooms.destroy(socket.roomCode);

                    // Client was a room owner, now we have to kick evryone else
                    io.to(socket.roomCode).emit('ownerLeft', {
                        'status': null,
                        'error': 'Room owner has left the game. The game connection has been lost.'
                    });
                } else if (rooms.list[socket.roomCode].isIn(socket.id)) {
                    // Client was a player within a room X, so we have to remove him
                    rooms.list[socket.roomCode].leave(socket.id);

                    // Leave room
                    socket.leave(socket.roomCode);

                    // Sending number of connected people to owner
                    socket.broadcast.to(rooms.list[socket.roomCode].owner).emit(
                        'connectedPeople',
                        rooms.list[socket.roomCode].numberOfPlayers()
                    );
                }
            }
        }
    });

    // Create room
    socket.on('createRoom', function() {
        var roomCode = code.generate(5, '#aA');

        // Add new room to our list
        rooms.create(roomCode, socket.id);

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
        if (rooms.exists(roomCode)) {

            // Check if room is locked
            if (!rooms.list[roomCode].locked) {

                // Check if client is already in room
                if (!rooms.list[roomCode].isIn(socket.id)) {

                    // Attach room code to a socket
                    socket.roomCode = roomCode;

                    // Join room
                    socket.join(roomCode);

                    // Add client to list
                    rooms.list[roomCode].join(socket.id);

                    // Send to current request socket client response message
                    socket.emit('joinRoomStatus', {
                        'status': true,
                        'error': null
                    });

                    // Sending number of connected people to owner
                    socket.broadcast.to(rooms.list[roomCode].owner).emit(
                        'connectedPeople',
                        rooms.list[roomCode].numberOfPlayers()
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
                'error': 'Bad code'
            });
        }
    });

    // Lock room and allow clients to select vehicle
    socket.on('readyToStart', function() {

        // Check if client was part of the group
        if (typeof socket.roomCode !== 'undefined') {

            // Check if room exists
            if (rooms.exists(socket.roomCode)) {

                // Check if client was a room owner
                if (rooms.list[socket.roomCode].isOwner(socket.id)) {

                    // Check if there is more than two people in the room
                    if (rooms.list[socket.roomCode].numberOfPlayers() > 1) {

                        // Lock room
                        rooms.list[socket.roomCode].lock();

                        // Move clients to select vehicle state
                        io.to(socket.roomCode).emit('switchToSelectVehicle', {
                            'status': true,
                            'error': null,
                            'cars': cars.list
                        });
                    } else {
                        // Cannot allow to move to next state, tell what's wrong
                        io.to(socket.roomCode).emit('switchToSelectVehicle', {
                            'status': false,
                            'error': 'To start the game you need at least two players'
                        });
                    }
                }
            }
        }
    });

    // Select vehicle
    socket.on('selectVehicle', function(vehicleName) {

        // Verify if vehicle exists
        if (cars.exists(vehicleName)) {

            // Check if player has already selected car
            if (!rooms.list[socket.roomCode].players[socket.id].hasCar()) {

                // Attach vehicle to player
                rooms.list[socket.roomCode].players[socket.id].setCar(cars.getCarObj(vehicleName));

                // Send a response back to the client say everything is ok
                socket.emit('selectVehicleStatus', {
                    'status': true,
                    'error': null
                });
            } else {
                // Send a response back to the client with an error message
                socket.emit('selectVehicleStatus', {
                    'status': false,
                    'error': 'You have already selected a vehicle'
                });
            }
        } else {
            // Send a response back to the client with an error message
            socket.emit('selectVehicleStatus', {
                'status': false,
                'error': 'Couldn\'t select vehicle, please try again'
            });
        }
    });
});

http.listen(3000, function() {
    console.log('Listening on *:3000');
});
