'use strict';

function Mowin() {
    this.overlay = document.querySelector('.js--overlay');
    this.box = document.querySelector('.js--mowin');
    this.close = document.querySelector('.js--mowin--close');
    this.container = document.querySelector('.js--mowin--container');

    this.init();
};

Mowin.prototype.init = function() {
    var o = this.overlay, b = this.box;
    this.close.onclick = function(e) {
        e.preventDefault();

        toggleClass(o, 'overlay--active');
        toggleClass(b, 'mowin--active');
    }
};

Mowin.prototype.toggle = function() {
    toggleClass(this.overlay, 'overlay--active');
    toggleClass(this.box, 'mowin--active');
};

Mowin.prototype.setText = function(text) {
    this.container.innerHTML = text;
};