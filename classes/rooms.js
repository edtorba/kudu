'use strict';
var Game = require('./game');

/**
 * Rooms Class
 */

function Rooms() {
    this.list = {};
};

// Create new room and add it to list
Rooms.prototype.create = function(roomName, owner) {
    this.list[roomName] = new Game(owner);
};

// Check if room exists
Rooms.prototype.exists = function(roomName) {
    return this.list.hasOwnProperty(roomName);
};

// Destroy room
Rooms.prototype.destroy = function(roomName) {

    // Check if room exists
    if (this.exists(roomName)) {
        delete this.list[roomName];
    } else {
        console.log('Cannot destroy room `' + roomName + '` as it does not exist');
    }
};

module.exports = Rooms;