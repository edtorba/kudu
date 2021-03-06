'use strict';
var CarSpecs = require('./carspecs');

/**
 * Cars Class
 */
function Cars() {
    this.list = {};
};

// Initialise default cars
Cars.prototype.init = function() {
    this.create('Golden Tiger', 5, 10, 7, 'images/red.png'); // Quick
    this.create('Blood Cobra', 5, 7, 10, 'images/blue.png');  // Strong
    this.create('Jungle Whale', 10, 5, 7, 'images/green.png'); // Prot
};

// Create new car and add it to list
Cars.prototype.create = function(name, armor, speed, power, image) {
    var key = this.toCamelCase(name);
    this.list[key] = new CarSpecs(name, armor, speed, power, image);
};

// Check if car exists
Cars.prototype.exists = function(name) {
    var key = this.toCamelCase(name);
    return this.list.hasOwnProperty(key);
};

// Destroy car
Cars.prototype.destroy = function(name) {
    var key = this.toCamelCase(name);

    // Check if car exists
    if (this.exists(key)) {
        delete this.list[key];
    } else {
        console.log('Cannot destroy car `' + name + '` as it does not exist');
    }
};

// Get car object
Cars.prototype.getCarObj = function(name) {
    var key = this.toCamelCase(name);
    return this.list[key];
};

// Convert space separated string to camel case
Cars.prototype.toCamelCase = function(sentenceCase) {
    var out = '';
    sentenceCase.split(' ').forEach(function (el, idx) {
        var add = el.toLowerCase();
        out += (idx === 0 ? add : add[0].toUpperCase() + add.slice(1));
    });
    return out;
};

module.exports = Cars;
