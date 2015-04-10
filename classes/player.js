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
    this.rotation = 0;
};

// Check if player has already selected car
Player.prototype.hasCar = function() {
    return this.car.model != null;
};

// Assignes a car object to player
Player.prototype.setCar = function(carObj) {
    this.car.model = carObj;
};

/**
 * Update player x and y coordinates and rotation
 */
Player.prototype.updateCoords = function(velocity) {
    // Update position based on velocity
    this.coordinates.x += velocity.x * (this.car.model.speed * 0.5);
    this.coordinates.y += velocity.y * (this.car.model.speed * 0.5);

    // Update rotation
    this.rotation = velocity.rotation;
};

module.exports = Player;
