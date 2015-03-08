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

/**
 * Main loop that draws our stuff
 */
Controller.prototype.loop = function() {
    var that = this;

    /**
     *  A hacky way of dealing with device orientation change.
     */
    if (this.canvas.height != window.innerHeight) {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    // Clear screen
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Circular touch pad
    var touchpad = {
        'radius': 75,
        'gutter': 24,
        x: function() { return this.radius + this.gutter;},
        y: function() { return window.innerHeight - this.radius - this.gutter;}
    };

    // Now draw it...
    this.context.strokeStyle = '#eee';
    this.context.lineWidth = '10';

    this.context.beginPath();

    // arc(x, y, radius, startAngle, endAngle, anticlockwise)
    this.context.arc(
            touchpad.x(),
            touchpad.y(),
            touchpad.radius,
            0,
            Math.PI * 2,
            true
        );
    this.context.stroke();

    // Pointer
    eachNode(this.points, function(node) {
        var finger = {
            'radius': 50,
            'gutter': 0
        };

        that.context.beginPath();
        // arc(x, y, radius, startAngle, endAngle, anticlockwise)
        that.context.arc(
                node.clientX,
                node.clientY,
                finger.radius,
                0,
                Math.PI * 2,
                true
            );
        that.context.fill();

        /**
         * Check if touch happened inside a circle.
         *
         * Formula:
         * C - circle
         * T - touch
         * (xT − xC)^2 + (yT − yC)^2 < r^2
         *
         * My maths teacher would be proud of me :P
         */
        var radius = Math.pow(touchpad.radius, 2);

        var pythagorean = Math.pow((touchpad.x() - node.clientX), 2) + Math.pow((touchpad.y() - node.clientY), 2);

        // if (pythagorean < radius) {
        //     console.log('in');
        // } else {
        //     console.log('out');
        // }
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
