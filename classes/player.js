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
    this.maxHealth = 1000;
    this.health = 300;
    this.lives = 1;
    this.alive = true;
    this.radius = 30;
    this.coordinates = {
        'x': 0,
        'y': 0
    };
    this.friction = 0.9;
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
 * Get velocity from a controller and set it to player object
 */
Player.prototype.setVelocity = function(velocity) {
    this.velocity = velocity;
};

/**
 * Get player velocity
 */
Player.prototype.getVelocity = function() {
    return this.velocity;
};

/**
 * Set player's score and money
 */
Player.prototype.setScoreAndMoney = function(scoreAndMoney) {
    this.score = scoreAndMoney.score;
    this.money = scoreAndMoney.money;
};

/**
 * Get player's score and money
 */
Player.prototype.getScoreAndMoney = function() {
    var _self = this;

    var data = {
        'score': _self.score,
        'money': _self.money
    };

    return data;
};

/**
 * Set player's health and lives
 */
Player.prototype.setHealthAndLives = function(healthAndLives) {
    this.health = healthAndLives.health;
    this.lives = healthAndLives.lives;
};

/**
 * Get player's health and lives
 */
Player.prototype.getHealthAndLives = function() {
    var _self = this;

    var data = {
        'maxHealth': _self.maxHealth,
        'health': _self.health,
        'lives': _self.lives
    };

    return data;
};

/**
 * Check if player still has lives
 */
Player.prototype.isAlive = function() {
    return this.alive;
};

/**
 * Kill player
 */
Player.prototype.kill = function() {
    this.alive = false;
}

/**
 * Resets user health and lives
 */
Player.prototype.resetHealth = function() {
    this.health = 1000;
    this.lives = 5;
    this.alive = true;
};

/**
 * Resets player velocity
 */
Player.prototype.resetVelocity = function() {
    this.velocity = {
        'x': 0,
        'y': 0,
        'rotation': 0
    };
};

module.exports = Player;
