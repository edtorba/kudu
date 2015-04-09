'use strict';

/**
 * GameEngine Initialiser
 */
function GameEngine() {
    var container = document.querySelector('.js--game-canvas');
    var _self = this;
    this.rAFId;

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
 * Draw player vehicles
 */
GameEngine.prototype.drawPlayers = function() {
    var _self = this;
    // TODO
};
