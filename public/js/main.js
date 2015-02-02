window.onload = function() {
    'use strict';

    var gameState = new GameState();
    gameState.init('.js--state');
    gameState.switchto('main-menu');

    /**
     * Main menu
     */
    var mainMenuStartBtn = document.querySelector('.js--main-menu--start');

    mainMenuStartBtn.onclick = function(e) {
        e.preventDefault();
        gameState.switchto('connecting');
    };

    /**
     * Connecting
     */
    var connectingReadyBtn = document.querySelector('.js--connecting--ready');

    connectingReadyBtn.onclick = function(e) {
        e.preventDefault();
        gameState.switchto('waiting-for-cars');
    }
};