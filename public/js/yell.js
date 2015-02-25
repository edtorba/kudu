'use strict';

function Yell() {
    this.yell = document.querySelector('.js--yell');
    this.container = document.querySelector('.js--yell__container');
    this.classNames = {
        'positive': 'yell--positive',
        'negative': 'yell--negative',
        'visible':  'yell--visible'
    };
    this.clickListener();
};

Yell.prototype.clickListener = function() {
    var that = this;

    this.container.addEventListener('click', function(e) {
        e.preventDefault();

        that.toggle();
    });
};

Yell.prototype.toggle = function() {
    toggleClass(this.yell, this.classNames.visible);
};

Yell.prototype.hide = function() {
    if (!hasClass(this.yell, this.classNames.visible)) {
        removeClass(this.yell, this.classNames.visible);
    }
};

Yell.prototype.show = function() {
    if (!hasClass(this.yell, this.classNames.visible)) {
        addClass(this.yell, this.classNames.visible);
    }
};

Yell.prototype.setText = function(text) {
    this.container.innerHTML = text;
};

Yell.prototype.positive = function() {
    // Removing negative class from container
    if (hasClass(this.container, this.classNames.negative)) {
        removeClass(this.container, this.classNames.negative);
    }

    // Adding positive class to container
    if (!hasClass(this.container, this.classNames.positive)) {
        addClass(this.container, this.classNames.positive);
    }
};

Yell.prototype.negative = function() {
    // Removing positive class from container
    if (hasClass(this.container, this.classNames.positive)) {
        removeClass(this.container, this.classNames.positive);
    }

    // Adding negative class to container
    if (!hasClass(this.container, this.classNames.negative)) {
        addClass(this.container, this.classNames.negative);
    }
};
