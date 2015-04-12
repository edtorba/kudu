'use strict';

/**
 * GameEngine Initialiser
 */
function GameEngine() {
    var container = document.querySelector('.js--game-canvas');
    var _self = this;
    this.rAFId;
    this.data = {};
    this.bullets = [];

    // Create canvas element
    this.canvas = createEle(false, 'canvas');
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    // Get context
    this.context = this.canvas.getContext('2d');

    // Insert canvas into DOM tree
    container.appendChild(this.canvas);
};

/**
 * Main loop
 */
GameEngine.prototype.loop = function() {
    var _self = this;

    this.rAFId = window.requestAnimationFrame(_self.loop.bind(this));

    // Clear screen
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Delete objects
    _self.deleteBullets();

    // Draw objects
    _self.drawPlayers();
    _self.drawBullets();

    // Collision detection
    _self.collisionDetection();
};

/**
 * Start RAF
 */
GameEngine.prototype.start = function() {
    var _self = this;
    if (!_self.rAFId) {
        _self.loop();
    }
};

/**
 * Stop RAF
 */
GameEngine.prototype.stop = function() {
    var _self = this;
    if (_self.rAFId) {
        window.cancelAnimationFrame(_self.rAFId);
        _self.rAFId = undefined;
    }
};

/**
 * Feed players object
 */
GameEngine.prototype.feedPlayers = function(players) {
    var _self = this;
    _self.data.players = players;
};

/**
 * Feed bullets
 */
GameEngine.prototype.feedBullets = function(player) {
    var _self = this;
    _self.bullets.push(new Bullet(
            player.id,
            player.coordinates.x,
            player.coordinates.y,
            player.rotation
        ));
};

/**
 * Draw player vehicles
 */
GameEngine.prototype.drawPlayers = function() {
    var _self = this;

    if (_self.data.players) {
        for (var player in _self.data.players) {
            // Check if player is alive
            if (_self.data.players[player].alive) {
                _self.context.fillStyle = '#ffffff';
                _self.context.beginPath();
                // arc(x, y, radius, startAngle, endAngle, anticlockwise)
                _self.context.arc(
                        _self.data.players[player].coordinates.x,
                        _self.data.players[player].coordinates.y,
                        _self.data.players[player].radius,
                        0,
                        Math.PI * 2,
                        true
                    );
                _self.context.fill();
            }
        };
    }
};

/**
 * Delete bullets that are out off the screen
 */
GameEngine.prototype.deleteBullets = function() {
    var _self = this;

    for (var i = 0; i < _self.bullets.length; i++) {
        if (_self.bullets[i].coordinates.x < 0
            || _self.bullets[i].coordinates.x > window.innerWidth
            || _self.bullets[i].coordinates.y < 0
            || _self.bullets[i].coordinates.y > window.innerHeight) {
            _self.bullets.splice(i, 1);
        }
    };
};

/**
 * Draw bullets
 */
GameEngine.prototype.drawBullets = function() {
    var _self = this;

    for (var i = 0; i < _self.bullets.length; i++) {
        _self.bullets[i].updateCoords();

        _self.context.fillStyle = '#ffffff';
        _self.context.beginPath();
        // arc(x, y, radius, startAngle, endAngle, anticlockwise)
        _self.context.arc(
                _self.bullets[i].coordinates.x,
                _self.bullets[i].coordinates.y,
                _self.bullets[i].radius,
                0,
                Math.PI * 2,
                true
            );
        _self.context.fill();
    };
};

/**
 * Collision detection
 */
GameEngine.prototype.collisionDetection = function() {
    var _self = this;

    /**
     * Check if someone has shot someone
     */
    if (_self.data.players) {
        for (var player in _self.data.players) {
            // Check if player is alive
            if (_self.data.players[player].alive) {
                for (var i = 0; i < _self.bullets.length; i++) {
                    if (_self.objectCollision(
                            _self.data.players[player].coordinates.x,
                            _self.data.players[player].coordinates.y,
                            _self.data.players[player].radius,
                            _self.data.players[player].radius,
                            _self.bullets[i].coordinates.x,
                            _self.bullets[i].coordinates.y,
                            _self.bullets[i].radius,
                            _self.bullets[i].radius
                        )) {
                        if (_self.bullets[i].id != player) {
                            // Notify server that player got shot
                            var data = {
                                'attacker': _self.bullets[i].id,
                                'victim': player
                            };
                            socket.emit('playerGotShot', data);

                            // Remove bullet that shot player
                            _self.bullets.splice(i, 1);
                        }
                    }
                }
            }
        }
    }
};

/**
 * Canvas collision detection
 * http://stackoverflow.com/questions/8017541/javascript-canvas-collision-detection
 */
GameEngine.prototype.objectCollision = function(x1, y1, w1, h1, x2, y2, w2, h2) {
    w2 += x2;
    w1 += x1;
    if (x2 > w1 || x1 > w2) return false;

    h2 += y2;
    h1 += y1;
    if (y2 > h1 || y1 > h2) return false;

    return true;
};

// Initialise GameEngine
var GameEngine = new GameEngine();
