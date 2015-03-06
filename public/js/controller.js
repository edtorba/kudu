'use strict';
window.requestAnimFrame = window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function( callback ){
            window.setTimeout(callback, 1000 / 60);
        };

// Controller class
function Controller() {
    this.container = document.querySelector('.js--controller');
    this.points = [];
    var that = this;

    // Canvas
    this.canvas = document.createElement('canvas');
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    // Context
    this.context = this.canvas.getContext('2d');

    // Adding canvas to container
    this.container.appendChild(this.canvas);

    // Listeners
    this.canvas.addEventListener('mousemove', function(e) {
        that.positionHandler(e, that);
    }, false);

    this.canvas.addEventListener('touchstart', function(e) {
        that.positionHandler(e, that);
    }, false);

    this.canvas.addEventListener('touchmove', function(e) {
        that.positionHandler(e, that);
    }, false);
};

/**
 * Collects the touch(es) X and Y possitions
 */
Controller.prototype.positionHandler = function(e, that) {
    if ( (e.clientX) && (e.clientY) ) {
        // Single touch
        that.points[0] = e;
    } else if (e.targetTouches) {
        // Multiple touches
        that.points = e.targetTouches;

        e.preventDefault();
    }
};

Controller.prototype.loop = function() {
    var that = this;

    /**
     *  A hacky way of dealing with device orientation change.
     */
    if (this.canvas.height != window.innerHeight) {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    // Draw circle
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.strokeStyle = '#eee';
    this.context.lineWidth = '10';

    eachNode(this.points, function(node) {
        that.context.beginPath();
        that.context.arc(node.clientX, node.clientY, 50, 0, Math.PI * 2, true);
        that.context.stroke();
    });
};

// Initialise controller
var Controller = new Controller();

// Our looph, here we go...
// place the rAF *before* the loop() to assure as close to
// 60fps with the setTimeout fallback.
(function animloop(){
    requestAnimFrame(animloop);
    Controller.loop();
})();
