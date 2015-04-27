'use strict';

function Controller() {
    var container = document.querySelector('.js--controller');
    var _self = this;
    this.rAFId;

    /**
     * D-Pad settings
     */
    this.dpad = {
        'enabled': false,
        'touchID': null,
        'velocity': {
            'x': 0,
            'y': 0,
            'rotation': 0
        },
        'gutter': 24,
        'position': {
            'x': function() {
                return _self.dpad.outerCircle.radius + _self.dpad.gutter;
            },
            'y': function() {
                return window.innerHeight - _self.dpad.outerCircle.radius - _self.dpad.gutter;
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
        },
        'label': {
            'text': 'D-Pad',
            'color': '#ffffff',
            'font': '16px Valera Round',
            'textAlign': 'center',
            'position': {
                'x': function() {
                    return _self.dpad.position.x();
                },
                'y': function() {
                    return _self.dpad.position.y() - 
                     _self.dpad.outerCircle.radius - 
                     _self.dpad.gutter;
                }
            }
        }
    };

    /**
     * Fire button settings
     */
    this.fire = {
        'enabled': false,
        'touchID': null,
        'velocity': {
            'rotation': 0
        },
        'gutter': 24,
        'position': {
            'x': function() {
                return window.innerWidth - _self.fire.outerCircle.radius - _self.fire.gutter;
            },
            'y': function() {
                return window.innerHeight - _self.fire.outerCircle.radius - _self.fire.gutter;
            }
        },
        'outerCircle': {
            'radius': 75,
            'color': '#fcb116',
            'activeColor': '#78879f',
        },
        'innerCircle': {
            'radius': 35,
            'color': '#78879f'
        },
        'label': {
            'text': 'Fire',
            'color': '#ffffff',
            'font': '16px Valera Round',
            'textAlign': 'center',
            'position': {
                'x': function() {
                    return _self.fire.position.x();
                },
                'y': function() {
                    return _self.fire.position.y() - 
                     _self.fire.outerCircle.radius - 
                     _self.fire.gutter;
                }
            }
        }
    };

    /**
     * Health bar settings
     */
    this.healthBar = {
        'width': 150,
        'height': 35,
        'gutter': 24,
        'position': {
            'x': function() {
                return _self.healthBar.gutter;
            },
            'y': function() {
                return _self.healthBar.gutter;
            }
        },
        'bar': {
            'color': '#78879f'
        },
        'value': {
            'color': '#6faa80'
        },
        'label': {
            'color': '#ffffff',
            'font': '16px Valera Round',
            'textAlign': 'center',
            'position': {
                'x': function() {
                    return _self.healthBar.position.x() + 
                    _self.healthBar.gutter;
                },
                'y': function() {
                    return _self.healthBar.position.y() + 
                     _self.healthBar.height / 
                     2 + 6;
                }
            }
        },
        'health': {
            'maxHealth': 1000,
            'health': 1000,
            'lives': 0
        }
    };


    /**
     * Score and Lives
     */
    this.playerStats = {
        'score': 0,
        'gutter': 24,
        'position': {
            'x': function() {
                return window.innerWidth - _self.playerStats.gutter - 50;
            },
            'y': function() {
                return _self.playerStats.gutter * 1.75;
            }
        },
        'label': {
            'text': 'score',
            'color': '#ffffff',
            'font': '16px Valera Round',
            'textAlign': 'right'
        }
    };

    /**
     * Stores all touch events data
     */
    this.touches = [];

    /**
     * Create canvas
     */
    this.canvas = createEle(false, 'canvas');
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    /**
     * Get context
     */
    this.context = this.canvas.getContext('2d');

    /**
     * Insert canvas into DOM tree
     */
    container.appendChild(this.canvas);

    /**
     * Touch listeners
     */
    // Touch listeners
    this.canvas.addEventListener('touchstart', function(e) {
        _self.touchHandler(e, _self);
    }, false);

    this.canvas.addEventListener('touchmove', function(e) {
        _self.touchHandler(e, _self);
    }, false);

    this.canvas.addEventListener('touchend', function(e) {
        _self.touchHandler(e, _self);

        // D-Pad
        if (_self.dpad.touchID == e.changedTouches[0].identifier) {
            _self.dpad.enabled = false;
            _self.dpad.touchID = null;
        }

        // Fire button
        if (_self.fire.touchID == e.changedTouches[0].identifier) {
            _self.fire.enabled = false;
            _self.fire.touchID = null;
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
 * Returns D-Pad velocity
 */
Controller.prototype.getDpadVelocity = function() {
    return this.dpad.velocity;
};

/**
 * Returns Fire button velocity
 */
Controller.prototype.getFireVelocity = function() {
    return this.fire.velocity;
};

/**
 * Set health value
 */
Controller.prototype.setHealthAndLives = function(health) {
    var _self = this;

    _self.healthBar.health = health;
};

/**
 * Set score value
 */
Controller.prototype.setScore = function(score) {
    var _self = this;

    _self.playerStats.score = score;
};

/**
 * Reset health
 */
Controller.prototype.resetHealth = function() {
    var _self = this;

    _self.healthBar.health = {
        'maxHealth': 1000,
        'health': 1000,
        'lives': 0
    };
};

/**
 * Reset score
 */
Controller.prototype.resetScore = function() {
    var _self = this;

    _self.playerStats.score = 0;
};

/**
 * Main loop. That's where everything happenes
 */
Controller.prototype.loop = function() {
    var _self = this;

    this.rAFId = window.requestAnimationFrame(_self.loop.bind(this));

    /**
     *  A hacky way of dealing with device orientation change.
     */
    if (this.canvas.height != window.innerHeight) {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    // Clear screen
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw buttons
    _self.drawDpad();
    _self.drawFire();

    // Draw health bar
    _self.drawHealthBar();

    // Draw player stats
    _self.drawPlayerStats();
};

/**
 * Start RAF
 */
Controller.prototype.start = function() {
    var _self = this;
    if (!_self.rAFId) {
        _self.loop();
    }
};

/**
 * Stop RAF
 */
Controller.prototype.stop = function() {
    var _self = this;
    if (_self.rAFId) {
        window.cancelAnimationFrame(_self.rAFId);
        _self.rAFId = undefined;
    }
};

/**
 * Draw D-Pad
 */
Controller.prototype.drawDpad = function() {
    var _self = this;

    /**
     * Draw outer circle
     */
    _self.context.strokeStyle = _self.dpad.outerCircle.color;
    _self.context.lineWidth = _self.dpad.outerCircle.width;

    _self.context.beginPath();
    // arc(x, y, radius, startAngle, endAngle, anticlockwise)
    _self.context.arc(
            _self.dpad.position.x(),
            _self.dpad.position.y(),
            _self.dpad.outerCircle.radius,
            0,
            Math.PI * 2,
            true
        );
    _self.context.stroke();

    /**
     * Draw label
     */
    _self.context.textAlign = _self.dpad.label.textAlign;
    _self.context.fillStyle = _self.dpad.label.color;
    _self.context.font = _self.dpad.label.font;
    _self.context.fillText(
            _self.dpad.label.text,
            _self.dpad.label.position.x(),
            _self.dpad.label.position.y()
        );

    /**
     * Inner circle data
     */
    var innerCircleDpadCoordinates = {
        'position': {
            'x': _self.dpad.position.x(),
            'y': _self.dpad.position.y()
        }
    };

    /**
     * Process touch data
     */
    eachNode(_self.touches, function(touch) {

        /**
         * Check if touch happened inside dpad outer circle area.
         *
         * Formula: C - Circle, T - Touch
            (xT − xC)^2 + (yT − yC)^2 < r^2
         *
         * My maths teacher would be proud of me :P
         */
        var tempDpadData = {
            'radius': Math.pow(_self.dpad.outerCircle.radius, 2),
            'xSide': function() {
                return _self.dpad.position.x() - touch.clientX;
            },
            'ySide': function() {
                return _self.dpad.position.y() - touch.clientY;
            },
            'pythagorean': function() {
                return Math.pow(tempDpadData.xSide(), 2) + Math.pow(tempDpadData.ySide(), 2);
            }
        };

        if (tempDpadData.pythagorean() < tempDpadData.radius) {
            _self.dpad.enabled = true;
            _self.dpad.touchID = touch.identifier;

            // Update inner circle position
            innerCircleDpadCoordinates.position.x = touch.clientX;
            innerCircleDpadCoordinates.position.y = touch.clientY;

            // Post coordinates to server
            _self.postCoordinates();
        } else {
            // Touch is outside dpad outer circle area

            // Verify that it is still the same touch that started inside inner circle
            if (_self.dpad.touchID == touch.identifier) {
                // Check if dpad is enabled
                if (_self.dpad.enabled) {
                    // Update inner circle position
                    var scaleRation = 
                        _self.dpad.outerCircle.radius / Math.sqrt(tempDpadData.pythagorean());

                    innerCircleDpadCoordinates.position.x = 
                        _self.dpad.position.x() - tempDpadData.xSide() * scaleRation;

                    innerCircleDpadCoordinates.position.y = 
                        _self.dpad.position.y() - tempDpadData.ySide() * scaleRation;

                    // Post coordinates to server
                    _self.postCoordinates();
                }
            }
        }

        /**
         * Calculate D-Pad velocity and rotation
         */
        // Check if it's right touch data
        if (_self.dpad.touchID == touch.identifier) {
            // Check if dpad is enabled
            if (_self.dpad.enabled) {
                /**
                 * X velocity
                 */
                // Negative
                if (_self.dpad.position.x() > touch.clientX) {
                    if (_self.dpad.position.x() - _self.dpad.outerCircle.radius > touch.clientX) {
                        _self.dpad.velocity.x = -100;
                    } else {
                        var width = _self.dpad.position.x() - touch.clientX;
                        _self.dpad.velocity.x = -(width * 100 / _self.dpad.outerCircle.radius);
                    }
                // Positive
                } else {
                    if (_self.dpad.position.x() + _self.dpad.outerCircle.radius > touch.clientX) {
                        var width = touch.clientX - _self.dpad.position.x();
                        _self.dpad.velocity.x = width * 100 / _self.dpad.outerCircle.radius;
                    } else {
                        _self.dpad.velocity.x = 100;
                    }
                }

                /**
                 * Y velocity
                 */
                // Negative
                if (_self.dpad.position.y() > touch.clientY) {
                    if (_self.dpad.position.y() - _self.dpad.outerCircle.radius > touch.clientY) {
                        _self.dpad.velocity.y = -100;
                    } else {
                        var heigh = _self.dpad.position.y() - touch.clientY;
                        _self.dpad.velocity.y = -(heigh * 100 / _self.dpad.outerCircle.radius);
                    }
                // Positive
                } else {
                    if (_self.dpad.position.y() + _self.dpad.outerCircle.radius > touch.clientY) {
                        var height = touch.clientY - _self.dpad.position.y();
                        _self.dpad.velocity.y = height * 100 / _self.dpad.outerCircle.radius;
                    } else {
                        _self.dpad.velocity.y = 100;
                    }
                }

                _self.dpad.velocity.x = _self.dpad.velocity.x / 100;
                _self.dpad.velocity.y = _self.dpad.velocity.y / 100;

                /**
                 * Calculate D-Pad rotation
                 */
                _self.dpad.velocity.rotation = Math.atan2(
                        _self.dpad.position.y() - touch.clientY,
                        _self.dpad.position.x() - touch.clientX
                    ) - (Math.PI / 2);
            }
        }
    });

    /**
     * Draw inner circle
     */
    _self.context.fillStyle = _self.dpad.innerCircle.color;
    _self.context.beginPath();
    // arc(x, y, radius, startAngle, endAngle, anticlockwise)
    _self.context.arc(
            innerCircleDpadCoordinates.position.x,
            innerCircleDpadCoordinates.position.y,
            _self.dpad.innerCircle.radius,
            0,
            Math.PI * 2,
            true
        );
    _self.context.fill();
};

/**
 * Draw fire button
 */
Controller.prototype.drawFire = function() {
    var _self = this;

    /**
     * Draw outer circle
     */
    _self.context.fillStyle = _self.fire.outerCircle.color;
    _self.context.beginPath();
    // arc(x, y, radius, startAngle, endAngle, anticlockwise)
    _self.context.arc(
            _self.fire.position.x(),
            _self.fire.position.y(),
            _self.fire.outerCircle.radius,
            0,
            Math.PI * 2,
            true
        );
    _self.context.fill();

    /**
     * Draw label
     */
    _self.context.textAlign = _self.fire.label.textAlign;
    _self.context.fillStyle = _self.fire.label.color;
    _self.context.font = _self.fire.label.font;
    _self.context.fillText(
            _self.fire.label.text,
            _self.fire.label.position.x(),
            _self.fire.label.position.y()
        );

    /**
     * Inner circle data
     */
    var innerCircleFireCoordinates = {
        'position': {
            'x': _self.fire.position.x(),
            'y': _self.fire.position.y()
        }
    };

    /**
     * Process touch data
     */
    eachNode(_self.touches, function(touch) {

        /**
         * Check if touch happened inside fire outer circle area.
         *
         * Formula: C - Circle, T - Touch
            (xT − xC)^2 + (yT − yC)^2 < r^2
         */
        var tempFireData = {
            'radius': Math.pow(_self.fire.outerCircle.radius, 2),
            'xSide': function() {
                return _self.fire.position.x() - touch.clientX;
            },
            'ySide': function() {
                return _self.fire.position.y() - touch.clientY;
            },
            'pythagorean': function() {
                return Math.pow(tempFireData.xSide(), 2) + Math.pow(tempFireData.ySide(), 2);
            }
        };

        if (tempFireData.pythagorean() < tempFireData.radius) {
            _self.fire.enabled = true;
            _self.fire.touchID = touch.identifier;

            // Update inner circle position
            innerCircleFireCoordinates.position.x = touch.clientX;
            innerCircleFireCoordinates.position.y = touch.clientY;

            // Post fire to server
            _self.postFire();
        } else {
            // Touch is outside fire outer circle area

            // Verify that it is still the same touch that started inside inner circle
            if (_self.fire.touchID == touch.identifier) {
                // Check if fire button is enabled
                if (_self.fire.enabled) {
                    // Update inner circle position
                    var scaleRation = 
                        _self.fire.outerCircle.radius / Math.sqrt(tempFireData.pythagorean());

                    innerCircleFireCoordinates.position.x = 
                        _self.fire.position.x() - tempFireData.xSide() * scaleRation;

                    innerCircleFireCoordinates.position.y = 
                        _self.fire.position.y() - tempFireData.ySide() * scaleRation;

                    // Post fire to server
                    _self.postFire();
                }
            }
        }

        /**
         * Calculate fire rotation
         */
        // Check if it's right touch data
        if (_self.fire.touchID == touch.identifier) {
            // Check if fire button is enabled
            if (_self.fire.enabled) {
                _self.fire.velocity.rotation = Math.atan2(
                        _self.fire.position.y() - touch.clientY,
                        _self.fire.position.x() - touch.clientX
                    ) + (Math.PI / 2);
            }
        }
    });

    /**
     * Draw inner circle
     */
    _self.context.fillStyle = _self.fire.innerCircle.color;
    _self.context.beginPath();
    // arc(x, y, radius, startAngle, endAngle, anticlockwise)
    _self.context.arc(
            innerCircleFireCoordinates.position.x,
            innerCircleFireCoordinates.position.y,
            _self.fire.innerCircle.radius,
            0,
            Math.PI * 2,
            true
        );
    _self.context.fill();
};

/**
 * Draw Health bar
 */
Controller.prototype.drawHealthBar = function() {
    var _self = this;

    /**
     * Draw bar
     */
    _self.context.fillStyle = _self.healthBar.bar.color;
    _self.context.beginPath();
    _self.context.rect(
            _self.healthBar.position.x(),
            _self.healthBar.position.y(),
            _self.healthBar.width,
            _self.healthBar.height
        );
    _self.context.fill();

    /**
     * Draw value
     */
    _self.context.fillStyle = _self.healthBar.value.color;
    _self.context.beginPath();
    _self.context.rect(
            _self.healthBar.position.x(),
            _self.healthBar.position.y(),
            _self.healthBar.width * 
            (_self.healthBar.health.health / _self.healthBar.health.maxHealth),
            _self.healthBar.height
        );
    _self.context.fill();

    /**
     * Draw label
     */
    _self.context.textAlign = _self.healthBar.health.textAlign;
    _self.context.fillStyle = _self.healthBar.label.color;
    _self.context.font = _self.healthBar.label.font;
    _self.context.fillText(
            _self.healthBar.health.health,
            _self.healthBar.label.position.x(),
            _self.healthBar.label.position.y()
        );
};

Controller.prototype.drawPlayerStats = function() {
    var _self = this;

    /**
     * Score
     */
    _self.context.textAlign = _self.playerStats.label.textAlign;
    _self.context.fillStyle = _self.playerStats.label.color;
    _self.context.font = _self.playerStats.label.font;
    _self.context.fillText(
            _self.playerStats.score + ' ' + _self.playerStats.label.text,
            _self.playerStats.position.x(),
            _self.playerStats.position.y()
        );
};

/**
 * Post client coordinates to server
 */
Controller.prototype.postCoordinates = function() {
    var _self = this;
    socket.emit('userUpdateCoords', _self.getDpadVelocity());
};

/**
 * Trigger bullets
 */
Controller.prototype.postFire = function() {
    var _self = this;;
    socket.emit('userUpdateBullets', _self.getFireVelocity());
};

/**
 * Initialise Controller
 */
var Controller = new Controller();
