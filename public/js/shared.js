// Toggle class name on DOM element
function toggleClass(ele, className) {
    if (ele.classList) {
        ele.classList.toggle(className);
    } else {
        var classes = ele.className.split(' ');
        var existingIndex = classes.indexOf(className);

        if (existingIndex >= 0)
          classes.splice(existingIndex, 1);
        else
          classes.push(className);

        ele.className = classes.join(' ');
    }
};

// Remove class name from DOM element
function removeClass(ele, className) {
    if (ele.classList)
        ele.classList.remove(className);
    else
        ele.className = ele.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
};

// Add class name to DOM element
function addClass(ele, className) {
    if (ele.classList)
        ele.classList.add(className);
    else
        ele.className += ' ' + className;
};

// Has class name in DOM element
function hasClass(ele, className) {
    if (ele.classList)
        return ele.classList.contains(className);
    else
        return new RegExp('(^| )' + className + '( |$)', 'gi').test(ele.className);
};

// Check if variable is empty
function isEmpty(text) {
    return (text.length === 0 || !text.trim());
};

// Loop through each node list element
function eachNode(nodeList, callback) {
    // If IsCallable(callback) is false, throw a TypeError exception.
    // See: http://es5.github.com/#x9.11
    if (typeof callback !== 'function') {
        throw new TypeError(callback + ' is not a function');
    }

    for (var i = 0; i < nodeList.length; i++) {
        callback(nodeList[i]);
    };
};

// Create DOM element
function createEle(classes, tag) {
    var ele = document.createElement(tag || 'div');

    if (classes)
        ele.className = classes;

    return ele;
};

/**
 * RAF
 * http://paulirish.com/2011/requestanimationframe-for-smart-animating/
 * http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
 *
 * MIT license
 */
(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }
 
    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
 
    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());
