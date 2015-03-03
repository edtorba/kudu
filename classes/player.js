'use strict';

/**
 * Player Class
 */
function Player() {
    this.car = null;
    this.score = 0;
    this.money = 0;
    this.armor = 0;
    this.speed = 0;
    this.power = 0;
    this.health = 1000;
    this.lives = 5;
    this.disqualified = false;
};

// Check if player has already selected car
Player.prototype.hasCar = function() {
    return this.car != null;
};

// Assignes a car object to player
Player.prototype.setCar = function(carObj) {
    this.car = carObj;
};

module.exports = Player;
