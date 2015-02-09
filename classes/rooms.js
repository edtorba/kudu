'use strict';
var Game = require('./game');

function Rooms() {
    this.list = {};
};

Rooms.prototype.create = function(roomName, owner) {
    this.list[roomName] = new Game(owner);
};

Rooms.prototype.exists = function(roomName) {
    return this.list.hasOwnProperty(roomName);
};

Rooms.prototype.destroy = function(roomName) {
    if (this.exists(roomName)) {
        delete this.list[roomName];
    } else {
        console.log('Cannot destroy room `' + roomName + '` as it does not exist');
    }
};

module.exports = Rooms;