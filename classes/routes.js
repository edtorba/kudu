module.exports = function(app) {
    
    // Game page
    app.get('/', function(req, res) {
        res.sendFile('game.html', {'root': 'public'});
    });
    
    // Controller page
    app.get('/controller', function(req, res) {
        res.sendFile('controller.html', {'root': 'public'});
    });
};
