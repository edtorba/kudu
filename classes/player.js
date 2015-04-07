'use strict';

/**
 * Player Class
 */
function Player() {
    this.score = 0;
    this.money = 0;
    this.car = {
        'model': null,
        'specs': {
            'armor': 0,
            'speed': 0,
            'power': 0
        }
    };
    this.health = 1000;
    this.lives = 5;
    this.disqualified = false;
    this.coordinates = {
        'x': 0,
        'y': 0
    };
};

// Check if player has already selected car
Player.prototype.hasCar = function() {
    return this.car.model != null;
};

// Assignes a car object to player
Player.prototype.setCar = function(carObj) {
    this.car.model = carObj;
};

module.exports = Player;
