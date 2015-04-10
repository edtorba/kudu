'use strict';

/**
 * Bullet class
 */
function Bullet(id, x, y, rotation) {
    var _self = this;

    this.id = id;
    this.coordinates = {
        'x': x,
        'y': x,
        // Adding some randomness to bullets to simulate spread
        'direction': rotation + (Math.random() * 0.2)
    };
    this.velocity = 15;
};

/**
 * Update bullet x and y coordinates
 */
Bullet.prototype.updateCoords = function() {
    var _self = this;

    _self.coordinates.x += Math.sin(_self.coordinates.direction) * _self.velocity;
    _self.coordinates.y += Math.cos(_self.coordinates.direction) * _self.velocity;
};
