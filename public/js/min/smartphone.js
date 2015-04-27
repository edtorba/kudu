window.onload=function(){"use strict";function e(e){e.addEventListener("click",function(e){e.preventDefault(),eachNode(n,function(e){e!=this&&(removeClass(e,"js--select-vehicle--selected"),removeClass(e,"car--selected"))}),hasClass(this,"js--select-vehicle--selected")||(addClass(this,"js--select-vehicle--selected"),addClass(this,"car--selected"))})}var t=new GameState(".js--state");t.switchto("enter-code");{var o=new Yell;new Fullscreen(".js--fullscreen")}socket.on("ownerLeft",function(e){t.switchto("enter-code"),o.setText(e.error),o.negative(),o.show(),Controller.stop(),Controller.resetHealth(),Controller.resetScore()}),socket.on("notEnoughPlayers",function(e){t.switchto("enter-code"),o.setText(e.error),o.negative(),o.show(),Controller.stop(),Controller.resetHealth(),Controller.resetScore()}),socket.on("disconnect",function(){t.switchto("enter-code"),o.setText("The game connection has been lost."),o.negative(),o.show()});var s=document.querySelector(".js--enter-code--join"),c=document.querySelector(".js--enter-code--code");s.onclick=function(e){e.preventDefault(),isEmpty(c.value)?(o.setText("Bad code"),o.negative(),o.show()):socket.emit("joinRoom",c.value)},socket.on("joinRoomStatus",function(e){e.status?(t.switchto("waiting-for-players"),c.value=""):(o.setText(e.error),o.negative(),o.show())});var n=document.querySelectorAll(".js--select-vehicle");socket.on("switchToSelectVehicle",function(e){if(e.status){var o=0;for(var s in e.cars)n[o].querySelector(".js--car__image").src=e.cars[s].image,n[o].dataset.vehicleName=e.cars[s].name,n[o].querySelector(".js--select-vehicle--name").innerHTML=e.cars[s].name,n[o].querySelector(".js--select-vehicle--armor").innerHTML=e.cars[s].armor,n[o].querySelector(".js--select-vehicle--speed").innerHTML=e.cars[s].speed,n[o].querySelector(".js--select-vehicle--power").innerHTML=e.cars[s].power,o++;t.switchto("enter-name")}});var r=document.querySelector(".js--enter-name--submit");r.onclick=function(e){e.preventDefault;var t=document.querySelector(".js--enter-name--name");isEmpty(t.value)?(o.setText("Bad name"),o.negative(),o.show()):socket.emit("submitName",t.value)},socket.on("nameReady",function(e){e.status&&t.switchto("select-vehicle")}),eachNode(n,function(t){e(t)});var l=document.querySelector(".js--select-vehicle--ready");l.onclick=function(e){e.preventDefault;var t=document.querySelector(".js--select-vehicle--selected");t?socket.emit("selectVehicle",t.dataset.vehicleName):(o.setText("Please select vehicle first"),o.negative(),o.show())},socket.on("selectVehicleStatus",function(e){e.status?t.switchto("waiting-for-vehicles"):(o.setText(e.error),o.negative(),o.show())}),socket.on("playersReady",function(e){e.status&&(t.switchto("controller"),Controller.start())}),socket.on("freshHealth",function(e){e.status&&Controller.setHealthAndLives(e.health)}),socket.on("freshScore",function(e){e.status&&Controller.setScore(e.scoreAndMoney.score)}),socket.on("playerLostLife",function(e){e.status&&window.navigator.vibrate(1e3)}),socket.on("displayScore",function(e){e.status&&(Controller.stop(),Controller.resetHealth(),t.switchto("display-score"))})};