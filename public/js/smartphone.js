window.onload = function() {
    'use strict';

    var gameState = new GameState();
    gameState.init('.js--state');
    gameState.switchto('enter-code');

    // Controller
    var controller = new Controller('.js--control-pad', '.js--button-x');

    // Fullscreen
    var fullscreen = new Fullscreen('.js--fullscreen');
};