'use strict';

function GameRooms() {
    this.list = {};
};

GameRooms.prototype.create = function(roomName, owner) {
    this.list[roomName] = new Game(owner);
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

function Game(owner) {
    this.locked = false;
    this.owner = owner;
    this.people = [];
};

// Add client to people list
Game.prototype.addClient = function(id) {
    this.people.push(id);
};

// Kill client from people list
Game.prototype.killClient = function(id) {
    // Find client's position
    var position = this.people.indexOf(id);
    if (position > -1) {
        // Execute client
        this.people.splice(position, 1);
    } else {
        // Don't move a muscle
        console.log('Counldn\'t execute client: ' + id);
    }
};

// Check if client is in people list
Game.prototype.inList = function(id) {
    return this.people.indexOf(id) != -1 ? true : false;
};

// Check if client is game owner
Game.prototype.isOwner = function(id) {
    return this.owner == id;
};

// Lock game
Game.prototype.lock = function() {
    this.locked = true;
};

Game.prototype.unlock = function() {
    this.locked = false;
};