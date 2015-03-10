'use strict';
window.requestAnimFrame = window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function( callback ){
            window.setTimeout(callback, 1000 / 60);
        };

// Controller class
function Controller() {
    this.enabled = false;
    this.container = document.querySelector('.js--controller');
    this.points = [];
    this.velocity = {
        'x': 0,
        'y': 0,
        'acceleration': 0
    };
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
    this.canvas.addEventListener('touchstart', function(e) {
        that.positionHandler(e, that);
    }, false);

    this.canvas.addEventListener('touchmove', function(e) {
        that.positionHandler(e, that);
    }, false);

    this.canvas.addEventListener('touchend', function(e) {
        that.positionHandler(e, that);
        that.enabled = false;
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
        'x': function() { return this.radius + this.gutter;},
        'y': function() { return window.innerHeight - this.radius - this.gutter;}
    };

    // Now draw it...
    this.context.strokeStyle = '#78879f';
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

    // Inner circle initial coordinates
    var finger = {
        'radius': 35,
        'x': touchpad.x(),
        'y': touchpad.y()
    };

    // Pointer
    eachNode(this.points, function(node) {
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
        var xSide = touchpad.x() - node.clientX;
        var ySide = touchpad.y() - node.clientY;
        var pythagorean = Math.pow(xSide, 2) + Math.pow(ySide, 2);

        if (pythagorean < radius) {
            that.enabled = true;

            /**
             * Workout touch distance to circle's edge
             * Formula:
             * acceleration = pythagorean * 100 / radius
             */
            that.velocity.acceleration = pythagorean * 100 / radius;

            finger.x = node.clientX;
            finger.y = node.clientY;
        } else {
            if (that.enabled) {
                /**
                 * Put pointer on circle's edge
                 */
                var scale = touchpad.radius / Math.sqrt(pythagorean);
                var xScaled = xSide * scale;
                var yScaled = ySide * scale;
                finger.x = touchpad.x() - xScaled;
                finger.y = touchpad.y() - yScaled;

                // Set acceleration to 100
                that.velocity.acceleration = 100;
            } else {
                that.velocity = {
                    'x': 0,
                    'y': 0,
                    'acceleration': 0
                };
            }
        }

        /**
         * Workout in what part of the circle touch event happened
         * e.g. south, west, north or east
         * based on that increase or decrease X and Y velocity
         */
        if (that.enabled) {
            // X
            if (touchpad.x() > node.clientX) {
                // West
                that.velocity.x = -1;
            } else if (touchpad.x() < node.clientX) {
                // East
                that.velocity.x = 1;
            }

            // Y
            if (touchpad.y() > node.clientY) {
                // North
                that.velocity.y = 1;
            } else if (touchpad.y() < node.clientY) {
                // South
                that.velocity.y = -1;
            }
        }
    });

    // Draw inner circle
    this.context.fillStyle = '#ffffff';
    this.context.beginPath();
    // arc(x, y, radius, startAngle, endAngle, anticlockwise)
    this.context.arc(
            finger.x,
            finger.y,
            finger.radius,
            0,
            Math.PI * 2,
            true
        );
    this.context.fill();
};

// Returns velocity object
Controller.prototype.getVelocity = function() {
    return this.velocity;
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
