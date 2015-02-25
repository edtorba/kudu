window.onload = function() {
    'use strict';

    var gameState = new GameState('.js--state');
    gameState.switchto('enter-code');

    var yell = new Yell();

    // Controller
    // var controller = new Controller('.js--control-pad', '.js--button-x');

    // Fullscreen
    var fullscreen = new Fullscreen('.js--fullscreen');

    /**
     * Room owner left.
     */
    socket.on('ownerLeft', function(resp) {
        gameState.switchto('enter-code');
        yell.setText(resp.error);
        yell.negative();
        yell.show();
        // TODO : reset game
    });

    /**
     * Disconnect
     */
    socket.on('disconnect', function() {
        gameState.switchto('enter-code');
        yell.setText('The game connection has been lost.');
        yell.negative();
        yell.show();
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
        } else {
            yell.setText('Bad code');
            yell.negative();
            yell.show();
        }
    };

    socket.on('joinRoomStatus', function(resp) {
        if (resp.status) {
            // Wait for for other players
            gameState.switchto('waiting-for-players');

            // Reset enter code field
            enterCodeCode.value = '';
        } else {
            yell.setText(resp.error);
            yell.negative();
            yell.show();
        }
    });

    /**
     * Select vehicle
     */
    socket.on('switchToSelectVehicle', function(resp) {
        if (resp.status) {
            // Create list of cars

            // Switch to select vehicle state
            gameState.switchto('select-vehicle');
        }
    });
};
