"use strict";function Controller(){var t=document.querySelector(".js--controller"),e=this;this.rAFId,this.dpad={enabled:!1,touchID:null,velocity:{x:0,y:0,rotation:0},gutter:24,position:{x:function(){return e.dpad.outerCircle.radius+e.dpad.gutter},y:function(){return window.innerHeight-e.dpad.outerCircle.radius-e.dpad.gutter}},outerCircle:{radius:75,color:"#78879f",width:"10"},innerCircle:{radius:35,color:"#ffffff"},label:{text:"D-Pad",color:"#ffffff",font:"16px Valera Round",textAlign:"center",position:{x:function(){return e.dpad.position.x()},y:function(){return e.dpad.position.y()-e.dpad.outerCircle.radius-e.dpad.gutter}}}},this.fire={enabled:!1,touchID:null,velocity:{rotation:0},gutter:24,position:{x:function(){return window.innerWidth-e.fire.outerCircle.radius-e.fire.gutter},y:function(){return window.innerHeight-e.fire.outerCircle.radius-e.fire.gutter}},outerCircle:{radius:75,color:"#fcb116",activeColor:"#78879f"},innerCircle:{radius:35,color:"#78879f"},label:{text:"Fire",color:"#ffffff",font:"16px Valera Round",textAlign:"center",position:{x:function(){return e.fire.position.x()},y:function(){return e.fire.position.y()-e.fire.outerCircle.radius-e.fire.gutter}}}},this.healthBar={width:150,height:35,gutter:24,position:{x:function(){return e.healthBar.gutter},y:function(){return e.healthBar.gutter}},bar:{color:"#78879f"},value:{color:"#6faa80"},label:{color:"#ffffff",font:"16px Valera Round",textAlign:"center",position:{x:function(){return e.healthBar.position.x()+e.healthBar.gutter},y:function(){return e.healthBar.position.y()+e.healthBar.height/2+6}}},health:{maxHealth:1e3,health:1e3,lives:0}},this.touches=[],this.canvas=createEle(!1,"canvas"),this.canvas.width=window.innerWidth,this.canvas.height=window.innerHeight,this.context=this.canvas.getContext("2d"),t.appendChild(this.canvas),this.canvas.addEventListener("touchstart",function(t){e.touchHandler(t,e)},!1),this.canvas.addEventListener("touchmove",function(t){e.touchHandler(t,e)},!1),this.canvas.addEventListener("touchend",function(t){e.touchHandler(t,e),e.dpad.touchID==t.changedTouches[0].identifier&&(e.dpad.enabled=!1,e.dpad.touchID=null),e.fire.touchID==t.changedTouches[0].identifier&&(e.fire.enabled=!1,e.fire.touchID=null)},!1)}Controller.prototype.touchHandler=function(t,e){t.clientX&&t.clientY?e.touches[0]=t:(e.touches=t.targetTouches,t.preventDefault())},Controller.prototype.getDpadVelocity=function(){return this.dpad.velocity},Controller.prototype.getFireVelocity=function(){return this.fire.velocity},Controller.prototype.setHealthAndLives=function(t){var e=this;e.healthBar.health=t},Controller.prototype.loop=function(){var t=this;this.rAFId=window.requestAnimationFrame(t.loop.bind(this)),this.canvas.height!=window.innerHeight&&(this.canvas.width=window.innerWidth,this.canvas.height=window.innerHeight),this.context.clearRect(0,0,this.canvas.width,this.canvas.height),t.drawDpad(),t.drawFire(),t.drawHealthBar()},Controller.prototype.start=function(){var t=this;t.rAFId||t.loop()},Controller.prototype.stop=function(){var t=this;t.rAFId&&(window.cancelAnimationFrame(t.rAFId),t.rAFId=void 0)},Controller.prototype.drawDpad=function(){var t=this;t.context.strokeStyle=t.dpad.outerCircle.color,t.context.lineWidth=t.dpad.outerCircle.width,t.context.beginPath(),t.context.arc(t.dpad.position.x(),t.dpad.position.y(),t.dpad.outerCircle.radius,0,2*Math.PI,!0),t.context.stroke(),t.context.textAlign=t.dpad.label.textAlign,t.context.fillStyle=t.dpad.label.color,t.context.font=t.dpad.label.font,t.context.fillText(t.dpad.label.text,t.dpad.label.position.x(),t.dpad.label.position.y());var e={position:{x:t.dpad.position.x(),y:t.dpad.position.y()}};eachNode(t.touches,function(i){var o={radius:Math.pow(t.dpad.outerCircle.radius,2),xSide:function(){return t.dpad.position.x()-i.clientX},ySide:function(){return t.dpad.position.y()-i.clientY},pythagorean:function(){return Math.pow(o.xSide(),2)+Math.pow(o.ySide(),2)}};if(o.pythagorean()<o.radius)t.dpad.enabled=!0,t.dpad.touchID=i.identifier,e.position.x=i.clientX,e.position.y=i.clientY,t.postCoordinates();else if(t.dpad.touchID==i.identifier&&t.dpad.enabled){var r=t.dpad.outerCircle.radius/Math.sqrt(o.pythagorean());e.position.x=t.dpad.position.x()-o.xSide()*r,e.position.y=t.dpad.position.y()-o.ySide()*r,t.postCoordinates()}if(t.dpad.touchID==i.identifier&&t.dpad.enabled){if(t.dpad.position.x()>i.clientX)if(t.dpad.position.x()-t.dpad.outerCircle.radius>i.clientX)t.dpad.velocity.x=-100;else{var n=t.dpad.position.x()-i.clientX;t.dpad.velocity.x=-(100*n/t.dpad.outerCircle.radius)}else if(t.dpad.position.x()+t.dpad.outerCircle.radius>i.clientX){var n=i.clientX-t.dpad.position.x();t.dpad.velocity.x=100*n/t.dpad.outerCircle.radius}else t.dpad.velocity.x=100;if(t.dpad.position.y()>i.clientY)if(t.dpad.position.y()-t.dpad.outerCircle.radius>i.clientY)t.dpad.velocity.y=-100;else{var a=t.dpad.position.y()-i.clientY;t.dpad.velocity.y=-(100*a/t.dpad.outerCircle.radius)}else if(t.dpad.position.y()+t.dpad.outerCircle.radius>i.clientY){var l=i.clientY-t.dpad.position.y();t.dpad.velocity.y=100*l/t.dpad.outerCircle.radius}else t.dpad.velocity.y=100;t.dpad.velocity.x=t.dpad.velocity.x/100,t.dpad.velocity.y=t.dpad.velocity.y/100,t.dpad.velocity.rotation=Math.atan2(t.dpad.position.y()-i.clientY,t.dpad.position.x()-i.clientX)}}),t.context.fillStyle=t.dpad.innerCircle.color,t.context.beginPath(),t.context.arc(e.position.x,e.position.y,t.dpad.innerCircle.radius,0,2*Math.PI,!0),t.context.fill()},Controller.prototype.drawFire=function(){var t=this;t.context.fillStyle=t.fire.outerCircle.color,t.context.beginPath(),t.context.arc(t.fire.position.x(),t.fire.position.y(),t.fire.outerCircle.radius,0,2*Math.PI,!0),t.context.fill(),t.context.textAlign=t.fire.label.textAlign,t.context.fillStyle=t.fire.label.color,t.context.font=t.fire.label.font,t.context.fillText(t.fire.label.text,t.fire.label.position.x(),t.fire.label.position.y());var e={position:{x:t.fire.position.x(),y:t.fire.position.y()}};eachNode(t.touches,function(i){var o={radius:Math.pow(t.fire.outerCircle.radius,2),xSide:function(){return t.fire.position.x()-i.clientX},ySide:function(){return t.fire.position.y()-i.clientY},pythagorean:function(){return Math.pow(o.xSide(),2)+Math.pow(o.ySide(),2)}};if(o.pythagorean()<o.radius)t.fire.enabled=!0,t.fire.touchID=i.identifier,e.position.x=i.clientX,e.position.y=i.clientY,t.postFire();else if(t.fire.touchID==i.identifier&&t.fire.enabled){var r=t.fire.outerCircle.radius/Math.sqrt(o.pythagorean());e.position.x=t.fire.position.x()-o.xSide()*r,e.position.y=t.fire.position.y()-o.ySide()*r,t.postFire()}t.fire.touchID==i.identifier&&t.fire.enabled&&(t.fire.velocity.rotation=Math.atan2(t.fire.position.y()-i.clientY,t.fire.position.x()-i.clientX)+Math.PI/2)}),t.context.fillStyle=t.fire.innerCircle.color,t.context.beginPath(),t.context.arc(e.position.x,e.position.y,t.fire.innerCircle.radius,0,2*Math.PI,!0),t.context.fill()},Controller.prototype.drawHealthBar=function(){var t=this;t.context.fillStyle=t.healthBar.bar.color,t.context.beginPath(),t.context.rect(t.healthBar.position.x(),t.healthBar.position.y(),t.healthBar.width,t.healthBar.height),t.context.fill(),t.context.fillStyle=t.healthBar.value.color,t.context.beginPath(),t.context.rect(t.healthBar.position.x(),t.healthBar.position.y(),t.healthBar.width*(t.healthBar.health.health/t.healthBar.health.maxHealth),t.healthBar.height),t.context.fill(),t.context.textAlign=t.healthBar.health.textAlign,t.context.fillStyle=t.healthBar.label.color,t.context.font=t.healthBar.label.font,t.context.fillText(t.healthBar.health.health,t.healthBar.label.position.x(),t.healthBar.label.position.y())},Controller.prototype.postCoordinates=function(){var t=this;socket.emit("userUpdateCoords",t.getDpadVelocity())},Controller.prototype.postFire=function(){var t=this;socket.emit("userUpdateBullets",t.getFireVelocity())};var Controller=new Controller;