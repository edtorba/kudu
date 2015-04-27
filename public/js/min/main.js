window.onload=function(){"use strict";var e=new GameState(".js--state");e.switchto("main-menu");var n=new Yell;socket.on("disconnect",function(){e.switchto("main-menu"),n.setText("The game connection has been lost."),n.negative(),n.show(),GameEngine.stop()}),socket.on("notEnoughPlayers",function(t){e.switchto("main-menu"),n.setText(t.error),n.negative(),n.show(),GameEngine.stop()});var t=document.querySelector(".js--main-menu--start");t.onclick=function(n){n.preventDefault(),e.switchto("connecting"),socket.emit("createRoom")};var o=document.querySelector(".js--connecting--ready"),c=document.querySelector(".js--connecting--code"),s=document.querySelector(".js--connecting--players");socket.on("connecting",function(e){c.innerHTML=e}),o.onclick=function(e){e.preventDefault(),socket.emit("readyToStart")},socket.on("connectedPeople",function(e){s.innerHTML=e}),socket.on("switchToSelectVehicle",function(t){t.status?e.switchto("waiting-for-cars"):(n.setText(t.error),n.negative(),n.show())}),socket.on("playersReady",function(n){n.status&&(GameEngine.feedPlayers(n.players),GameEngine.start(),e.switchto("game"))}),socket.on("updateUserVelocity",function(e){e.status&&GameEngine.feedVelocity(e.player)}),socket.on("userUpdateBullets",function(e){e.status&&GameEngine.feedBullets(e.player)});var r=document.querySelector(".js--scoreboard");socket.on("showScore",function(n){if(n.status){e.switchto("scoreboard"),r.innerHTML="";var t=[];for(var o in n.players)t.push([n.players[o].name,n.players[o].score]);t.sort(function(e,n){return e[1]+n[1]}),eachNode(t,function(e){var n=createEle(!1,"li");n.innerHTML=e[0]+" "+e[1],r.appendChild(n)})}});var a=document.querySelector(".js--scoreboard--ready");a.onclick=function(e){e.preventDefault(),socket.emit("nextRound")},socket.on("playerLeft",function(e){GameEngine.leave(e)})};