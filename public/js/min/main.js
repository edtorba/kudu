window.onload=function(){"use strict";var e=new GameState(".js--state");e.switchto("main-menu");var t=new Yell;socket.on("disconnect",function(){e.switchto("main-menu"),t.setText("The game connection has been lost."),t.negative(),t.show()});var n=document.querySelector(".js--main-menu--start");n.onclick=function(t){t.preventDefault(),e.switchto("connecting"),socket.emit("createRoom")};var o=document.querySelector(".js--connecting--ready"),c=document.querySelector(".js--connecting--code"),i=document.querySelector(".js--connecting--players");socket.on("connecting",function(e){c.innerHTML=e}),o.onclick=function(e){e.preventDefault(),socket.emit("readyToStart")},socket.on("connectedPeople",function(e){i.innerHTML=e}),socket.on("switchToSelectVehicle",function(n){n.status?e.switchto("waiting-for-cars"):(t.setText(n.error),t.negative(),t.show())}),socket.on("playersReady",function(t){t.status&&e.switchto("game")})};