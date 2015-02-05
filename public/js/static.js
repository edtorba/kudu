function toggleClass(elem, className) {

    if (elem.classList) {
        elem.classList.toggle(className);
    } else {
        var classes = elem.className.split(' ');
        var existingIndex = classes.indexOf(className);

        if (existingIndex >= 0)
            classes.splice(existingIndex, 1);
        else
            classes.push(className);

        elem.className = classes.join(' ');
    }
};


function isEmpty(text) {
    return (text.length === 0 || !text.trim());
};