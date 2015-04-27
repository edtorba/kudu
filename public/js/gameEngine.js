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
    this.numberOfAlivePlayers = 0;

    // Background image
    this.background = new Image();
    this.background.src = 'images/background.png';

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

    // Check number of alive players
    if (_self.numbOfAlivePlayers() <= 1) {
        // End round
        socket.emit('endRound', _self.data.players);
        _self.stop();
    }

    // Delete objects
    _self.deleteBullets();

    // Draw background
    _self.drawBackground();

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
        _self.resetGame();
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
 * Reset game
 */
GameEngine.prototype.resetGame = function() {
    var _self = this;

    _self.bullets = [];
};

/**
 * Feed players object
 */
GameEngine.prototype.feedPlayers = function(players) {
    var _self = this;
    _self.data.players = players;
    _self.numberOfAlivePlayers = Object.keys(players).length;

    // Position players in the middle of the screen on start
    for (var player in _self.data.players) {
        _self.data.players[player].coordinates.x = window.innerWidth / 2;
        _self.data.players[player].coordinates.y = window.innerHeight / 2;
    };
};

/**
 * Update user velocity
 */
GameEngine.prototype.feedVelocity = function(player) {
    var _self = this;
    _self.data.players[player.id].velocity = player.velocity;
};

/**
 * Feed bullets
 */
GameEngine.prototype.feedBullets = function(player) {
    var _self = this;
    _self.bullets.push(new Bullet(
            player.id,
            _self.data.players[player.id].coordinates.x,
            _self.data.players[player.id].coordinates.y,
            player.rotation
        ));
};

/**
 * Reducing player's health and lives on hit
 */
GameEngine.prototype.reduceHealth = function(id) {
    var _self = this;

    if (_self.data.players[id].lives >= 0 && 
        _self.data.players[id].health > 0) {
            _self.data.players[id].health -= 10;

        /**
         * If health is lower than 0, reduce lives and reset health
         */
        if (_self.data.players[id].health <= 0 && 
            _self.data.players[id].lives > 0) {
                _self.data.players[id].health = 1000;
                _self.data.players[id].lives -= 1;
                socket.emit('playerLostLife', id);
        }
    } else {
        _self.numberOfAlivePlayers--;
        _self.data.players[id].alive = false;
        socket.emit('playerDied', id);
    }
};

/**
 * Get players health and lives
 */
GameEngine.prototype.getHealth = function(id) {
    var _self = this;

    var data = {
        'lives': _self.data.players[id].lives,
        'health': _self.data.players[id].health
    }

    return data;
};

/**
 * Increase score and money
 */
GameEngine.prototype.increaseScore = function(id) {
    var _self = this;

    // Adding 100 score and money per hit
    _self.data.players[id].score += 100;
    _self.data.players[id].money += 100;
};

/**
 * Get score and money
 */
GameEngine.prototype.getScore = function(id) {
    var _self = this;

    var data = {
        'score': _self.data.players[id].score,
        'money': _self.data.players[id].money
    };

    return data;
};

/**
 * Draw game background
 */
GameEngine.prototype.drawBackground = function() {
    var _self = this;

    var pattern = _self.context.createPattern(_self.background, 'repeat');
    _self.context.fillStyle = pattern;
    _self.context.fillRect(0, 0, window.innerWidth, window.innerHeight);
};

/**
 * Draw player vehicles
 */
GameEngine.prototype.drawPlayers = function() {
    var _self = this;

    _self.updatePlayersCoordinates();

    if (_self.data.players) {
        for (var player in _self.data.players) {
            // Check if player is alive
            if (_self.data.players[player].alive) {
                _self.context.save();
                _self.context.translate(
                        _self.data.players[player].coordinates.x,
                        _self.data.players[player].coordinates.y
                    );
                _self.context.rotate(_self.data.players[player].velocity.rotation);
                var newImage = new Image();
                newImage.src = _self.data.players[player].car.model.image;
                _self.context.drawImage(
                        newImage,
                        0,
                        0,
                        60,
                        60,
                        -30,
                        -30,
                        60,
                        60
                    );
                _self.context.restore();
            }
        };
    }
};

/**
 * Update player coordinates
 */
GameEngine.prototype.updatePlayersCoordinates = function() {
    var _self = this;

    if (_self.data.players) {
        for (var player in _self.data.players) {
            // Check if player is alive (to reduce load)
            if (_self.data.players[player].alive) {
                // Gradually make the players velocity 0
                _self.data.players[player].velocity.x *= _self.data.players[player].friction;
                _self.data.players[player].velocity.y *= _self.data.players[player].friction;

                // Update position based on velocity
                _self.data.players[player].coordinates.x += 
                                _self.data.players[player].velocity.x *
                                (_self.data.players[player].car.model.speed * 0.5);
                _self.data.players[player].coordinates.y += 
                                _self.data.players[player].velocity.y *
                                (_self.data.players[player].car.model.speed * 0.5);

                // Check if player has gone out of bounds
                if (_self.data.players[player].coordinates.x < 0)
                        _self.data.players[player].coordinates.x = 0;

                if (_self.data.players[player].coordinates.x > window.innerWidth)
                        _self.data.players[player].coordinates.x = window.innerWidth;

                if (_self.data.players[player].coordinates.y < 0)
                        _self.data.players[player].coordinates.y = 0;

                if (_self.data.players[player].coordinates.y > window.innerHeight)
                        _self.data.players[player].coordinates.y = window.innerHeight;
            }
        }
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
                            _self.data.players[player].coordinates.x - _self.data.players[player].radius,
                            _self.data.players[player].coordinates.y - _self.data.players[player].radius,
                            _self.data.players[player].radius * 2,
                            _self.data.players[player].radius * 2,
                            _self.bullets[i].coordinates.x,
                            _self.bullets[i].coordinates.y,
                            _self.bullets[i].radius,
                            _self.bullets[i].radius
                        )) {
                        if (_self.bullets[i].id != player) {
                            // Reduce victims health
                            _self.reduceHealth(player);

                            // Increase attacker's score
                            _self.increaseScore(_self.bullets[i].id);

                            // Feed fresh health and score data to server
                            var data = {
                                'attacker': {
                                    'id': _self.bullets[i].id,
                                    'scoreAndMoney': _self.getScore(_self.bullets[i].id)
                                },
                                'victim': {
                                    'id': player,
                                    'healthAndLives': _self.getHealth(player)
                                }
                            };

                            socket.emit('feedHealthAndScore', data);

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
 * Get number of alive players
 */
GameEngine.prototype.numbOfAlivePlayers = function() {
    var _self = this;

    return _self.numberOfAlivePlayers;
};

/**
 * Check if player is in a game
 */
GameEngine.prototype.isIn = function(id) {
    var _self = this;

    return _self.data.players.hasOwnProperty(id);
};

/**
 * Player left game
 */
GameEngine.prototype.leave = function(id) {
    var _self = this;

    // Check if player exists
    if (_self.isIn(id)) {
        delete _self.data.players[id];
        _self.numberOfAlivePlayers--;
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
