'use strict';
var Player = require('./player');

/**
 * Game Class
 */

function Game(owner) {
    this.locked = false;
    this.owner = owner;
    this.display = {
        'width': 0,
        'height': 0
    };
    this.players = {};
};

// Add player to players list
Game.prototype.join = function(id) {
    this.players[id] = new Player();
};

// Check if player is in list
Game.prototype.isIn = function(id) {
    return this.players.hasOwnProperty(id);
};

// Kill client from people list
Game.prototype.leave = function(id) {

    // Check if player exists
    if (this.isIn(id)) {
        delete this.players[id];
    } else {
        console.log('Cannot remove player `' + id + '` as he is not in the list');
    }
};

// Number of players in game
Game.prototype.numberOfPlayers = function() {
    return Object.keys(this.players).length;
}

// Verify that everyone has selected car
Game.prototype.everyoneHasCar = function() {
    var numberOfPlayersWithCar = 0;

    // Check every player
    for (var player in this.players) {
        this.players[player].hasCar() ? numberOfPlayersWithCar++ : null;
    };

    return this.numberOfPlayers() === numberOfPlayersWithCar;
};

// Check if client is game owner
Game.prototype.isOwner = function(id) {
    return this.owner == id;
};

// Lock game
Game.prototype.lock = function() {
    this.locked = true;
};

// Unlock game
Game.prototype.unlock = function() {
    this.locked = false;
};

// Set display width and height
Game.prototype.setDisplay = function(display) {
    this.display = display;
};

// Get display
Game.prototype.getDisplay = function() {
    return this.display;
};

module.exports = Game;
