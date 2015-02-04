module.exports = {
    // Generates random alpha-numeric-string
    // http://stackoverflow.com/questions/10726909/random-alpha-numeric-string-in-javascript
    // Example usage:
    // console.log(randomString(16, 'aA'));
    // console.log(randomString(32, '#aA'));
    // console.log(randomString(64, '#A!'));
    generate: function(length, chars) {
        var mask = '';

        if (chars.indexOf('a') > -1) mask += 'abcdefghijklmnopqrstuvwxyz';
        if (chars.indexOf('A') > -1) mask += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (chars.indexOf('#') > -1) mask += '0123456789';
        if (chars.indexOf('!') > -1) mask += '~`!@#$%^&*()_+-={}[]:";\'<>?,./|\\';

        var result = '';

        for (var i = length; i > 0; --i) result += mask[Math.round(Math.random() * (mask.length - 1))];

        return result;
    }
};
