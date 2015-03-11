'use strict';

function Controller() {
    var container = document.querySelector('.js--controller');
    var _self = this;

    // Joystick related data
    this.joystick = {
        'enabled': false,
        'touchID': null,
        'velocity': {
            'x': 0,
            'y': 0,
            'acceleration': 0
        },
        'gutter': 24,
        'position': {
            'x': function() {
                return _self.joystick.outerCircle.radius + _self.joystick.gutter;
            },
            'y': function() {
                return window.innerHeight - _self.joystick.outerCircle.radius - _self.joystick.gutter;
            }
        },
        'outerCircle': {
            'radius': 75,
            'color': '#78879f',
            'width': '10'
        },
        'innerCircle': {
            'radius': 35,
            'color': '#ffffff'
        }
    };

    // Burst button
    this.burst = {
        'gutter': 24,
        'radius': 75,
        'position': {
            'x': function() {
                return window.innerWidth - _self.burst.radius - _self.burst.gutter;
            },
            'y': function() {
                return window.innerHeight - _self.burst.radius - _self.burst.gutter;
            }
        },
        'color': '#fcb116',
        'activeColor': '#78879f'
    };

    // Touch related data
    this.touches = [];

    // Create canvas element
    this.canvas = createEle(false, 'canvas');
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    // Get context
    this.context = this.canvas.getContext('2d');

    // Insert canvas into DOM tree
    container.appendChild(this.canvas);

    // Touch listeners
    this.canvas.addEventListener('touchstart', function(e) {
        _self.touchHandler(e, _self);
    }, false);

    this.canvas.addEventListener('touchmove', function(e) {
        _self.touchHandler(e, _self);
    }, false);

    this.canvas.addEventListener('touchend', function(e) {
        _self.touchHandler(e, _self);

        // Joysting related stuff
        if (_self.joystick.touchID == e.changedTouches[0].identifier) {
            _self.joystick.enabled = false;
            _self.joystick.touchID = null;

            // Reset velocity
            _self.joystick.velocity.x = 0;
            _self.joystick.velocity.y = 0;
            _self.joystick.velocity.acceleration = 0;
        }
    }, false);
};

/**
 * Collects data regarding single or multimple touches
 * such as X, Y coordinates, touch ID, etc.
 * pushes all data into `touches` object.
 */
Controller.prototype.touchHandler = function(e, _self) {
    if ( (e.clientX) && (e.clientY) ) {
        // Single touch
        _self.touches[0] = e;
    } else {
        // Multiple touches
        _self.touches = e.targetTouches;

        e.preventDefault();
    }
};

/**
 * Returns joystick velocity
 */
Controller.prototype.getJoystickVelocity = function() {
    return this.joystick.velocity;
};

/**
 * Main loop. That's where everything happenes
 */
Controller.prototype.loop = function() {
    var _self = this;

    /**
     *  A hacky way of dealing with device orientation change.
     */
    if (this.canvas.height != window.innerHeight) {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    // Clear screen
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    /**
     * Joystick related stuff
     */
    // Outer circle
    this.context.strokeStyle = this.joystick.outerCircle.color;
    this.context.lineWidth = this.joystick.outerCircle.width;

    this.context.beginPath();
    // arc(x, y, radius, startAngle, endAngle, anticlockwise)
    this.context.arc(
            _self.joystick.position.x(),
            _self.joystick.position.y(),
            _self.joystick.outerCircle.radius,
            0,
            Math.PI * 2,
            true
        );
    this.context.stroke();

    // Inner circle
    var temporaryJoystickCoordinates = {
        'position': {
            'x': _self.joystick.position.x(),
            'y': _self.joystick.position.y()
        }
    };

    // Burst
    var temporaryBurstColor = {
        'color': _self.burst.color
    };

    // Deal with touches
    eachNode(this.touches, function(node) {

        /**
         * Check if touch happened inside outerCircle area.
         *
         * Formula:
            C - Circle
            T - Touch
            (xT − xC)^2 + (yT − yC)^2 < r^2
         *
         * My maths teacher would be proud of me :P
         */
        var tempJoystick = {
            'radius': Math.pow(_self.joystick.outerCircle.radius, 2),
            'xSide': function() {
                return _self.joystick.position.x() - node.clientX;
            },
            'ySide': function() {
                return _self.joystick.position.y() - node.clientY;
            },
            'pythagorean': function() {
                return Math.pow(tempJoystick.xSide(), 2) + Math.pow(tempJoystick.ySide(), 2);
            }
        };

        if (tempJoystick.pythagorean() < tempJoystick.radius) {
            _self.joystick.enabled = true;
            _self.joystick.touchID = node.identifier;

            // Touch inside outerCircle
            temporaryJoystickCoordinates.position.x = node.clientX;
            temporaryJoystickCoordinates.position.y = node.clientY;

            // Joysticks acceleration
            _self.joystick.velocity.acceleration = tempJoystick.pythagorean() * 100 / tempJoystick.radius;
        } else {
            // Touch is outside outerCircle

            // Verify that it's the same touch
            if (_self.joystick.touchID == node.identifier) {

                // Verify that joystick is enabled
                if (_self.joystick.enabled) {
                    var scaleRatio = _self.joystick.outerCircle.radius / Math.sqrt(tempJoystick.pythagorean());

                    temporaryJoystickCoordinates.position.x = _self.joystick.position.x() - tempJoystick.xSide() * scaleRatio;
                    temporaryJoystickCoordinates.position.y = _self.joystick.position.y() - tempJoystick.ySide() * scaleRatio;

                    // Set joystick acceleration to max
                    _self.joystick.velocity.acceleration = 100;
                }
            }
        }

        /**
         * Check if touch happened inside burst area.
         */
        var tempBurst = {
            'radius': Math.pow(_self.burst.radius, 2),
            'xSide': function() {
                return _self.burst.position.x() - node.clientX;
            },
            'ySide': function() {
                return _self.burst.position.y() - node.clientY;
            },
            'pythagorean': function() {
                return Math.pow(tempBurst.xSide(), 2) + Math.pow(tempBurst.ySide(), 2);
            }
        };

        if (tempBurst.pythagorean() < tempBurst.radius) {
            temporaryBurstColor.color = _self.burst.activeColor;
        }

        /**
         * Workout joystick innerCircle direction
         * e.g. south, west, north, east
         */
        // Verify that it's the right touch
        if (_self.joystick.touchID == node.identifier) {
            // Verify that joystick is enabled
            if (_self.joystick.enabled) {
                // X coordinates
                if (_self.joystick.position.x() > node.clientX) {
                    _self.joystick.velocity.x = -1; // West
                } else if (_self.joystick.position.x() < node.clientX) {
                    _self.joystick.velocity.x = 1; // East
                }

                // Y coordinates
                if (_self.joystick.position.y() > node.clientY) {
                    _self.joystick.velocity.y = 1; // North
                } else if (_self.joystick.position.y() < node.clientY) {
                    _self.joystick.velocity.y = -1; // South
                }
            }
        }
    });

    // Inner circle
    this.context.fillStyle = this.joystick.innerCircle.color;
    this.context.beginPath();
    // arc(x, y, radius, startAngle, endAngle, anticlockwise)
    this.context.arc(
            temporaryJoystickCoordinates.position.x,
            temporaryJoystickCoordinates.position.y,
            _self.joystick.innerCircle.radius,
            0,
            Math.PI * 2,
            true
        );
    this.context.fill();


    /**
     * Burst button
     */
    this.context.fillStyle = temporaryBurstColor.color;
    this.context.beginPath();
    // arc(x, y, radius, startAngle, endAngle, anticlockwise)
    this.context.arc(
            _self.burst.position.x(),
            _self.burst.position.y(),
            _self.burst.radius,
            0,
            Math.PI * 2,
            true
        );
    this.context.fill();
};

// Initialise Controller
var Controller = new Controller();

// Our animation looph, here we go...
// place the rAF *before* the loop() to assure as close to
// 60fps with the setTimeout fallback.
(function animLoop() {
    requestAnimFrame(animLoop);
    Controller.loop();
})();
