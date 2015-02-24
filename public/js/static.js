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

// Check if variable is empty
function isEmpty(text) {
    return (text.length === 0 || !text.trim());
};
