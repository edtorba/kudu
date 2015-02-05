'use strict';

function GameRooms() {
    this.list = {};
};

GameRooms.prototype.create = function(roomName) {
    this.list[roomName] = new Game();
};

GameRooms.prototype.exists = function(roomName) {
    return this.list.hasOwnProperty(roomName);
};

GameRooms.prototype.destroy = function(roomName) {
    if (this.exists(roomName)) {
        delete this.list[roomName];
    } else {
        console.log('Cannot destroy room `' + roomName + '` as it does not exist');
    }
};

module.exports = new GameRooms();

function Game() {
    // TODO
    this.people = [];
};

// Add client to people list
Game.prototype.addPerson = function(id) {
    this.people.push(id);
};

// Check if client is in people list
Game.prototype.inList = function(id) {
    return this.people.indexOf(id) != -1 ? true : false;
};