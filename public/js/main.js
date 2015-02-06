window.onload = function() {
    'use strict';

    var gameState = new GameState();
    gameState.init('.js--state');
    gameState.switchto('main-menu');

    var mowin = new Mowin();

    /**
     * Main menu
     */
    var mainMenuStartBtn = document.querySelector('.js--main-menu--start');

    mainMenuStartBtn.onclick = function(e) {
        e.preventDefault();
        gameState.switchto('connecting');

        // Emit to app.js
        socket.emit('createRoom');
    };

    /**
     * Connecting
     */
    var connectingReadyBtn = document.querySelector('.js--connecting--ready');
    var connectingCode = document.querySelector('.js--connecting--code');

    socket.on('connecting', function(code) {
        connectingCode.innerHTML = code;
    });

    connectingReadyBtn.onclick = function(e) {
        e.preventDefault();
        gameState.switchto('waiting-for-cars');
    }
};