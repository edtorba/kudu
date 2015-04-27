window.onload = function() {
    'use strict';

    var gameState = new GameState('.js--state');
    gameState.switchto('enter-code');

    var yell = new Yell();

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
    var selectVehicleCarList = document.querySelectorAll('.js--select-vehicle');
    socket.on('switchToSelectVehicle', function(resp) {
        if (resp.status) {
            // TODO: Refactoring
            // Create list of cars
            var i = 0;
            for (var car in resp.cars) {
                // Car image
                selectVehicleCarList[i].querySelector('.js--car__image').src = resp.cars[car].image;
                // Car name
                selectVehicleCarList[i].dataset.vehicleName = resp.cars[car].name;
                selectVehicleCarList[i].querySelector('.js--select-vehicle--name').innerHTML = resp.cars[car].name;
                // Car armor
                selectVehicleCarList[i].querySelector('.js--select-vehicle--armor').innerHTML = resp.cars[car].armor;
                // Car speed
                selectVehicleCarList[i].querySelector('.js--select-vehicle--speed').innerHTML = resp.cars[car].speed;
                // Car power
                selectVehicleCarList[i].querySelector('.js--select-vehicle--power').innerHTML = resp.cars[car].power;

                i++;
            };

            // Switch to select vehicle state
            gameState.switchto('select-vehicle');
        }
    });

    // Car click listeners
    eachNode(selectVehicleCarList, function(node) {
        selectVehicleClickListener(node);
    });

    function selectVehicleClickListener(ele) {

        ele.addEventListener('click', function(e) {
            e.preventDefault();

            // Remove selected class from other cars
            eachNode(selectVehicleCarList, function(node) {
                if (node != this) {
                    removeClass(node, 'js--select-vehicle--selected');
                    removeClass(node, 'car--selected');
                }
            });

            // Check if car is selected
            if (!hasClass(this, 'js--select-vehicle--selected')) {
                addClass(this, 'js--select-vehicle--selected');
                addClass(this, 'car--selected');
            }
        });
    };

    // Switch to next state
    var selectVehicleReadyBtn = document.querySelector('.js--select-vehicle--ready');

    selectVehicleReadyBtn.onclick = function(e) {
        e.preventDefault;

        var selectedCar = document.querySelector('.js--select-vehicle--selected');

        // Check if user has selected car
        if (selectedCar) {
            socket.emit('selectVehicle', selectedCar.dataset.vehicleName);
        } else {
            yell.setText('Please select vehicle first');
            yell.negative();
            yell.show();
        }
    };

    socket.on('selectVehicleStatus', function(resp) {
        if (resp.status) {
            // Switch to select waiting for other players state
            gameState.switchto('waiting-for-vehicles');
        } else {
            yell.setText(resp.error);
            yell.negative();
            yell.show();
        }
    });

    // All players selected vehicles
    socket.on('playersReady', function(resp) {
        if (resp.status) {
            // Switch to controller view
            gameState.switchto('controller');
            Controller.start();
        }
    });

    // Fresh health
    socket.on('freshHealth', function(resp) {
        if (resp.status) {
            // Update health bar
            Controller.setHealthAndLives(resp.health);
        }
    })

    // Fresh health
    socket.on('freshScore', function(resp) {
        if (resp.status) {
            // Update score
            Controller.setScore(resp.scoreAndMoney.score);
        }
    });

    // Player lost life
    socket.on('playerLostLife', function(resp) {
        if (resp.status) {
            window.navigator.vibrate(1000);
        }
    });

    // Display score screen
    socket.on('displayScore', function(resp) {
        if (resp.status) {
            Controller.stop();
            gameState.switchto('display-score');
        }
    });
};
