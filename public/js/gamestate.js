'use strict';

function GameState(className) {
    this.sections = {};

    this.active = 'state--active';
    this.inactive = 'state--inactive';

    this.init(className);
};

// Retrieve all sections and push them to sections list
GameState.prototype.init = function(className) {

    var list = document.querySelectorAll(className);

    for (var i = 0; i < list.length; i++) {
        this.add(list[i].dataset.game, list[i]);
    };
};

// Add section to sections list
GameState.prototype.add = function(name, elem) {

    this.sections[name] = elem;
};

// Switch to X section
GameState.prototype.switchto = function(name) {

    // Hide all sections
    for (var prop in this.sections) {
        this.hide(this.sections[prop]);
    };
    
    // Show requested section
    this.show(this.sections[name]);
};

// Hide section
GameState.prototype.hide = function(elem) {
    
    this.removeClass(elem, this.active);
    this.addClass(elem, this.inactive);
};

// Show section
GameState.prototype.show = function(elem) {
    
    this.removeClass(elem, this.inactive);
    this.addClass(elem, this.active);
};

// Remove class
GameState.prototype.removeClass = function(elem, className) {
    
    if (elem.classList)
        elem.classList.remove(className);
    else
        elem.className = elem.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
};

// Add Class
GameState.prototype.addClass = function(elem, className) {
    
    if (elem.classList)
        elem.classList.add(className);
    else
        elem.className += ' ' + className;
};