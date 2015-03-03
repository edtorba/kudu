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
