"use strict";function Controller(){var i=document.querySelector(".js--controller"),t=this;this.rAFId,this.dpad={enabled:!1,touchID:null,velocity:{x:0,y:0,rotation:0},gutter:24,position:{x:function(){return t.dpad.outerCircle.radius+t.dpad.gutter},y:function(){return window.innerHeight-t.dpad.outerCircle.radius-t.dpad.gutter}},outerCircle:{radius:75,color:"#78879f",width:"10"},innerCircle:{radius:35,color:"#ffffff"}},this.fire={enabled:!1,touchID:null,velocity:{rotation:0},gutter:24,position:{x:function(){return window.innerWidth-t.fire.outerCircle.radius-t.fire.gutter},y:function(){return window.innerHeight-t.fire.outerCircle.radius-t.fire.gutter}},outerCircle:{radius:75,color:"#fcb116",activeColor:"#78879f"},innerCircle:{radius:35,color:"#78879f"}},this.touches=[],this.canvas=createEle(!1,"canvas"),this.canvas.width=window.innerWidth,this.canvas.height=window.innerHeight,this.context=this.canvas.getContext("2d"),i.appendChild(this.canvas),this.canvas.addEventListener("touchstart",function(i){t.touchHandler(i,t)},!1),this.canvas.addEventListener("touchmove",function(i){t.touchHandler(i,t)},!1),this.canvas.addEventListener("touchend",function(i){t.touchHandler(i,t),t.dpad.touchID==i.changedTouches[0].identifier&&(t.dpad.enabled=!1,t.dpad.touchID=null),t.fire.touchID==i.changedTouches[0].identifier&&(t.fire.enabled=!1,t.fire.touchID=null)},!1)}Controller.prototype.touchHandler=function(i,t){i.clientX&&i.clientY?t.touches[0]=i:(t.touches=i.targetTouches,i.preventDefault())},Controller.prototype.getDpadVelocity=function(){return this.dpad.velocity},Controller.prototype.getFireVelocity=function(){return this.fire.velocity},Controller.prototype.loop=function(){var i=this;this.rAFId=window.requestAnimationFrame(i.loop.bind(this)),this.canvas.height!=window.innerHeight&&(this.canvas.width=window.innerWidth,this.canvas.height=window.innerHeight),this.context.clearRect(0,0,this.canvas.width,this.canvas.height),i.drawDpad(),i.drawFire()},Controller.prototype.start=function(){var i=this;i.rAFId||i.loop()},Controller.prototype.stop=function(){var i=this;i.rAFId&&(window.cancelAnimationFrame(i.rAFId),i.rAFId=void 0)},Controller.prototype.drawDpad=function(){var i=this;i.context.strokeStyle=i.dpad.outerCircle.color,i.context.lineWidth=i.dpad.outerCircle.width,i.context.beginPath(),i.context.arc(i.dpad.position.x(),i.dpad.position.y(),i.dpad.outerCircle.radius,0,2*Math.PI,!0),i.context.stroke();var t={position:{x:i.dpad.position.x(),y:i.dpad.position.y()}};eachNode(i.touches,function(e){var o={radius:Math.pow(i.dpad.outerCircle.radius,2),xSide:function(){return i.dpad.position.x()-e.clientX},ySide:function(){return i.dpad.position.y()-e.clientY},pythagorean:function(){return Math.pow(o.xSide(),2)+Math.pow(o.ySide(),2)}};if(o.pythagorean()<o.radius)i.dpad.enabled=!0,i.dpad.touchID=e.identifier,t.position.x=e.clientX,t.position.y=e.clientY,i.postCoordinates();else if(i.dpad.touchID==e.identifier&&i.dpad.enabled){var r=i.dpad.outerCircle.radius/Math.sqrt(o.pythagorean());t.position.x=i.dpad.position.x()-o.xSide()*r,t.position.y=i.dpad.position.y()-o.ySide()*r,i.postCoordinates()}if(i.dpad.touchID==e.identifier&&i.dpad.enabled){if(i.dpad.position.x()>e.clientX)if(i.dpad.position.x()-i.dpad.outerCircle.radius>e.clientX)i.dpad.velocity.x=-100;else{var n=i.dpad.position.x()-e.clientX;i.dpad.velocity.x=-(100*n/i.dpad.outerCircle.radius)}else if(i.dpad.position.x()+i.dpad.outerCircle.radius>e.clientX){var n=e.clientX-i.dpad.position.x();i.dpad.velocity.x=100*n/i.dpad.outerCircle.radius}else i.dpad.velocity.x=100;if(i.dpad.position.y()>e.clientY)if(i.dpad.position.y()-i.dpad.outerCircle.radius>e.clientY)i.dpad.velocity.y=-100;else{var d=i.dpad.position.y()-e.clientY;i.dpad.velocity.y=-(100*d/i.dpad.outerCircle.radius)}else if(i.dpad.position.y()+i.dpad.outerCircle.radius>e.clientY){var a=e.clientY-i.dpad.position.y();i.dpad.velocity.y=100*a/i.dpad.outerCircle.radius}else i.dpad.velocity.y=100;i.dpad.velocity.x=i.dpad.velocity.x/100,i.dpad.velocity.y=i.dpad.velocity.y/100,i.dpad.velocity.rotation=Math.atan2(i.dpad.position.y()-e.clientY,i.dpad.position.x()-e.clientX)}}),i.context.fillStyle=i.dpad.innerCircle.color,i.context.beginPath(),i.context.arc(t.position.x,t.position.y,i.dpad.innerCircle.radius,0,2*Math.PI,!0),i.context.fill()},Controller.prototype.drawFire=function(){var i=this;i.context.fillStyle=i.fire.outerCircle.color,i.context.beginPath(),i.context.arc(i.fire.position.x(),i.fire.position.y(),i.fire.outerCircle.radius,0,2*Math.PI,!0),i.context.fill();var t={position:{x:i.fire.position.x(),y:i.fire.position.y()}};eachNode(i.touches,function(e){var o={radius:Math.pow(i.fire.outerCircle.radius,2),xSide:function(){return i.fire.position.x()-e.clientX},ySide:function(){return i.fire.position.y()-e.clientY},pythagorean:function(){return Math.pow(o.xSide(),2)+Math.pow(o.ySide(),2)}};if(o.pythagorean()<o.radius)i.fire.enabled=!0,i.fire.touchID=e.identifier,t.position.x=e.clientX,t.position.y=e.clientY,i.postFire();else if(i.fire.touchID==e.identifier&&i.fire.enabled){var r=i.fire.outerCircle.radius/Math.sqrt(o.pythagorean());t.position.x=i.fire.position.x()-o.xSide()*r,t.position.y=i.fire.position.y()-o.ySide()*r,i.postFire()}i.fire.touchID==e.identifier&&i.fire.enabled&&(i.fire.velocity.rotation=Math.atan2(i.fire.position.y()-e.clientY,i.fire.position.x()-e.clientX)+Math.PI/2)}),i.context.fillStyle=i.fire.innerCircle.color,i.context.beginPath(),i.context.arc(t.position.x,t.position.y,i.fire.innerCircle.radius,0,2*Math.PI,!0),i.context.fill()},Controller.prototype.postCoordinates=function(){var i=this;socket.emit("userUpdateCoords",i.getDpadVelocity())},Controller.prototype.postFire=function(){var i=this;socket.emit("userUpdateBullets",i.getFireVelocity())};var Controller=new Controller;