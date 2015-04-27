window.onload = function() {
    'use strict';

    var gameState = new GameState('.js--state');
    gameState.switchto('main-menu');

    var yell = new Yell();

    /**
     * Disconnect
     */
    socket.on('disconnect', function() {
        gameState.switchto('main-menu');
        yell.setText('The game connection has been lost.');
        yell.negative();
        yell.show();
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
            yell.setText(resp.error);
            yell.negative();
            yell.show();
        }
    });

    /**
     * Waiting for clients to select vehicles screen.
     */
    socket.on('playersReady', function(resp) {
        if (resp.status) {
            /**
             * Switch to game state and initialise game canvas.
             */
            GameEngine.feedPlayers(resp.players);
            GameEngine.start();
            // TODO: Pass data to GameEngine
            gameState.switchto('game');
        }
    });

    /**
     * Update user velocity
     */
    socket.on('updateUserVelocity', function(resp) {
        if (resp.status) {
            GameEngine.feedVelocity(resp.player);
        }
    });

    /**
     * Fire bullets
     */
    socket.on('userUpdateBullets', function(resp) {
        if (resp.status) {
            GameEngine.feedBullets(resp.player);
        }
    });

    /**
     * Switch to score state
     */
    var scoreboard = document.querySelector('.js--scoreboard');

    socket.on('showScore', function(resp) {
        if (resp.status) {
            gameState.switchto('scoreboard');

            // TODO Populate score board
            console.log(resp.players);
            // Clear scoreboard
            scoreboard.innerHTML = '';

            // Sort results
            var sortable = [];
            for (var player in resp.players) {
                sortable.push([player, resp.players[player].score]);
            };
            sortable.sort(function(a, b) {return a[1] + b[1]});

            // Populate scoreboard
            eachNode(sortable, function(node) {
                var list = createEle(false, 'li');
                list.innerHTML = node[1];
                scoreboard.appendChild(list);
            });
        }
    });
};
