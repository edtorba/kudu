'use strict';

function Game() {
    var container = document.querySelector('.js--game-canvas');
    var _self = this;

    // Create canvas element
    this.canvas = createEle(false, 'canvas');
    this.canvas.width = window.innerWidth;
    this.canas.height = window.innerHeight;

    // Get context
    this.context = this.canvas.getContext('2d');

    // Insert canvas into DOM tree
    container.appendChild(this.canvas);
};

Game.prototype.loop = function() {
    var _self = this;
    // TODO
};

Game.prototype.drawPlayers = function() {
    var _self = this;
    // TODO
};
