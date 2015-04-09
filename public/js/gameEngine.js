'use strict';

/**
 * GameEngine Initialiser
 */
function GameEngine() {
    var container = document.querySelector('.js--game-canvas');
    var _self = this;
    this.rAFId;
    this.data = {};

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

    // Draw players
    _self.drawPlayers();
    // TODO
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
 * Draw player vehicles
 */
GameEngine.prototype.drawPlayers = function() {
    var _self = this;

    if (_self.data.players) {
        for (var player in _self.data.players) {
            this.context.fillStyle = '#ffffff';
            this.context.beginPath();
            // arc(x, y, radius, startAngle, endAngle, anticlockwise)
            this.context.arc(
                    _self.data.players[player].coordinates.x,
                    _self.data.players[player].coordinates.y,
                    30,
                    0,
                    Math.PI * 2,
                    true
                );
            this.context.fill();

            // TODO: Check if player is disqualified and lives
            // console.log(_self.data.players[player]);
        };
        // TODO: Draw players
    }
};

// Initialise GameEngine
var GameEngine = new GameEngine();
