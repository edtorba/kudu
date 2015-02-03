'use strict';

function Controller(controlPad, xButton) {
    // controlPad, xButton
    this.controlPad = document.querySelector(controlPad);
    this.xButton = document.querySelector(xButton);

    // Initialise listeners
    if (this.controlPad === null || this.xButton === null) {
        this.init();
    }
};

Controller.prototype.init = function() {
    // Control Pad
    this.touchstart(this.controlPad);
    this.touchmove(this.controlPad);
    this.touchend(this.controlPad);
};

Controller.prototype.touchstart = function(elem) {
    elem.addEventListener('touchstart', function(e) {
        e.preventDefault();
        console.log('Touch Start');
        var touches = e.changedTouches;

        for (var i = 0; i < touches.length; i++) {
            console.log('touchstart:' + i);
            console.log('pageX:' + touches[i].pageX);
            console.log('pageY:' + touches[i].pageY);
        }
    });
};

Controller.prototype.touchmove = function(elem) {
    elem.addEventListener('touchmove', function(e) {
        e.preventDefault();

        console.log('Touch Move');
        var touches = e.changedTouches;

        for (var i = 0; i < touches.length; i++) {
            console.log('touchmove:' + i);
            console.log('pageX:' + touches[i].pageX);
            console.log('pageY:' + touches[i].pageY);
        }
    });
};

Controller.prototype.touchend = function(elem) {
    elem.addEventListener('touchend', function(e) {
        e.preventDefault();

        console.log('Touch End');
        var touches = e.changedTouches;

        for (var i = 0; i < touches.length; i++) {
            console.log('touchend:' + i);
            console.log('pageX:' + touches[i].pageX);
            console.log('pageY:' + touches[i].pageY);
        }
    });
};