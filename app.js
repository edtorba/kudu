var express = require('express');
var app     = express();
var http    = require('http').Server(app);
var io      = require('socket.io')(http);

// Make "public" folder publicly accessible
app.use(express.static(__dirname + '/public'));

// Routes
require('./components/routes.js')(app);

io.on('connection', function(socket) {

    // User connected or disconnected block
    console.log('a user connected: ' + socket.id);
    socket.on('disconnect', function() {
        console.log('user disconnect: ' + socket.id);
    });
});

http.listen(3000, function() {
    console.log('Listening on *:3000');
});