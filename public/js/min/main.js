window.onload=function(){"use strict";var n=new GameState;n.init(".js--state"),n.switchto("main-menu");var e=(new Mowin,document.querySelector(".js--main-menu--start"));e.onclick=function(e){e.preventDefault(),n.switchto("connecting"),socket.emit("createRoom")};var t=document.querySelector(".js--connecting--ready"),c=document.querySelector(".js--connecting--code");socket.on("connecting",function(n){c.innerHTML=n}),t.onclick=function(e){e.preventDefault(),n.switchto("waiting-for-cars")}};