window.onload = function() {
    'use strict';

    var gameState = new GameState('.js--state');
    gameState.switchto('main-menu');

    var mowin = new Mowin();

    /**
     * Disconnect
     */
    socket.on('disconnect', function() {
        gameState.switchto('main-menu');
        mowin.setText('The game connection has been lost.');
        mowin.toggle();
        // TODO : reset game
    });

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
    var connectingConnectingPlayers = document.querySelector('.js--connecting--players');

    socket.on('connecting', function(code) {
        connectingCode.innerHTML = code;
    });

    connectingReadyBtn.onclick = function(e) {
        e.preventDefault();

        // Emit to app.js
        socket.emit('readyToStart');
    }

    socket.on('connectedPeople', function(numb) {
        connectingConnectingPlayers.innerHTML = numb;
    });

    socket.on('switchToSelectVehicle', function(resp) {
        if (resp.status) {
            gameState.switchto('waiting-for-cars');
        } else {
            mowin.setText(resp.error);
            mowin.toggle();
        }
    });
};