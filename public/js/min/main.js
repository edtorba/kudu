window.onload=function(){"use strict";var e=new GameState(".js--state");e.switchto("main-menu");var n=new Mowin;socket.on("disconnect",function(){e.switchto("main-menu"),n.setText("The game connection has been lost."),n.toggle()});var t=document.querySelector(".js--main-menu--start");t.onclick=function(n){n.preventDefault(),e.switchto("connecting"),socket.emit("createRoom")};var o=document.querySelector(".js--connecting--ready"),c=document.querySelector(".js--connecting--code"),i=document.querySelector(".js--connecting--players");socket.on("connecting",function(e){c.innerHTML=e}),o.onclick=function(n){n.preventDefault(),e.switchto("waiting-for-cars"),socket.emit("waitingForCars")},socket.on("connectedPeople",function(e){i.innerHTML=e})};