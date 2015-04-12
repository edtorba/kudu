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
    this.alive = true;
    this.radius = 30;
    this.coordinates = {
        'x': 0,
        'y': 0
    };
    this.velocity = {
        'x': 0,
        'y': 0,
        'rotation': 0
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

/**
 * Update player x and y coordinates and rotation
 */
Player.prototype.updateCoordinates = function(display, velocity) {
    // Update position based on velocity
    this.coordinates.x += velocity.x * (this.car.model.speed * 0.5);
    this.coordinates.y += velocity.y * (this.car.model.speed * 0.5);

    // Update rotation
    this.rotation = velocity.rotation;

    // Check if plays has gone out of bounds
    if (this.coordinates.x < 0) this.coordinates.x = 0;
    if (this.coordinates.x > display.width) this.coordinates.x = display.width;

    if (this.coordinates.y < 0) this.coordinates.y = 0;
    if (this.coordinates.y > display.height) this.coordinates.y = display.height;
};

/**
 * Increase score and money
 */
Player.prototype.increaseScore = function() {
    // Adding 100 score and money per hit
    this.score += 100;
    this.money += 100;
};

/**
 * Reducing player's health and lives on hit
 */
Player.prototype.reduceHealth = function() {
    if (this.lives >= 0 && this.health > 0) {
        this.health -= 10;

        /**
         * If health is lower than 0, reduce lives and reset health
         */
        if (this.health <= 0 && this.lives > 0) {
            this.health = 1000;
            this.lives -= 1;
        }
    } else {
        this.alive = false;
    }
};

/**
 * Check if player still has lives
 */
Player.prototype.isAlive = function() {
    return this.alive;
};

/**
 * Resets user health and lives
 */
Player.prototype.resetHealth = function() {
    this.health = 1000;
    this.lives = 5;
    this.alive = true;
};

module.exports = Player;
