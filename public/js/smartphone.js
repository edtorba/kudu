window.onload = function() {
    'use strict';

    var gameState = new GameState();
    gameState.init('.js--state');
    gameState.switchto('enter-code');

    var mowin = new Mowin();

    // Controller
    // var controller = new Controller('.js--control-pad', '.js--button-x');

    // Fullscreen
    var fullscreen = new Fullscreen('.js--fullscreen');

    /**
     * Room owner left.
     */
    socket.on('ownerLeft', function(resp) {
        gameState.switchto('enter-code');
        mowin.setText(resp.error);
        mowin.toggle();
        // TODO : reset game
    });

    /**
     * Disconnect
     */
    socket.on('disconnect', function() {
        gameState.switchto('enter-code');
        mowin.setText('The game connection has been lost.');
        mowin.toggle();
        // TODO : reset game
    });

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

    socket.on('joinRoomStatus', function(resp) {
        if (resp.status) {
            // Wait for for other players
            gameState.switchto('waiting-for-players');

            // Reset enter code field
            enterCodeCode.value = '';
        } else {
            mowin.setText(resp.error);
            mowin.toggle();
        }
    });
};