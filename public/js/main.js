window.onload = function() {
    'use strict';

    var gameState = new GameState();
    gameState.init('.js--state');
    gameState.switchto('main-menu');
};