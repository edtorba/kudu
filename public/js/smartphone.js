window.onload = function() {
    'use strict';

    var gameState = new GameState();
    gameState.init('.js--state');
    gameState.switchto('enter-code');

    // Controller
    // var controller = new Controller('.js--control-pad', '.js--button-x');

    // Fullscreen
    var fullscreen = new Fullscreen('.js--fullscreen');

    /**
     * Enter code.
     */
    var enterCodeJoinBtn = document.querySelector('.js--enter-code--join');
    var enterCodeCode = document.querySelector('.js--enter-code--code');

    enterCodeJoinBtn.onclick = function(e) {
        e.preventDefault();

        // Verify code
        if (!isEmpty(enterCodeCode.value)) {

            // Emit to app.js
            socket.emit('joinRoom', enterCodeCode.value);
        }
    };

    socket.on('joinRoomStat', function(resp) {
        if (resp.status) {
            // Wait for for other players
            gameState.switchto('waiting-for-players');
        } else {
            // TODO: Show error message
        }
    });
};