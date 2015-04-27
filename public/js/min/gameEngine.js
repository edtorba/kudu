"use strict";function GameEngine(){var e=document.querySelector(".js--game-canvas");this.rAFId,this.data={},this.bullets=[],this.numberOfAlivePlayers=0,this.background=new Image,this.background.src="images/background.png",this.canvas=createEle(!1,"canvas"),this.canvas.width=window.innerWidth,this.canvas.height=window.innerHeight,this.context=this.canvas.getContext("2d"),e.appendChild(this.canvas)}GameEngine.prototype.loop=function(){var e=this;this.rAFId=window.requestAnimationFrame(e.loop.bind(this)),this.context.clearRect(0,0,this.canvas.width,this.canvas.height),e.numbOfAlivePlayers()<=1&&(socket.emit("endRound",e.data.players),e.stop()),e.deleteBullets(),e.drawBackground(),e.drawPlayers(),e.drawBullets(),e.collisionDetection()},GameEngine.prototype.start=function(){var e=this;e.rAFId||(e.resetGame(),e.loop())},GameEngine.prototype.stop=function(){var e=this;e.rAFId&&(window.cancelAnimationFrame(e.rAFId),e.rAFId=void 0)},GameEngine.prototype.resetGame=function(){var e=this;e.bullets=[]},GameEngine.prototype.feedPlayers=function(e){var a=this;a.data.players=e,a.numberOfAlivePlayers=Object.keys(e).length;for(var t in a.data.players)a.data.players[t].coordinates.x=window.innerWidth/2,a.data.players[t].coordinates.y=window.innerHeight/2},GameEngine.prototype.feedVelocity=function(e){var a=this;a.data.players[e.id].velocity=e.velocity},GameEngine.prototype.feedBullets=function(e){var a=this;a.bullets.push(new Bullet(e.id,a.data.players[e.id].coordinates.x,a.data.players[e.id].coordinates.y,e.rotation))},GameEngine.prototype.reduceHealth=function(e){var a=this;a.data.players[e].lives>=0&&a.data.players[e].health>0?(a.data.players[e].health-=10,a.data.players[e].health<=0&&a.data.players[e].lives>0&&(a.data.players[e].health=1e3,a.data.players[e].lives-=1,socket.emit("playerLostLife",e))):(a.numberOfAlivePlayers--,a.data.players[e].alive=!1,socket.emit("playerDied",e))},GameEngine.prototype.getHealth=function(e){var a=this,t={lives:a.data.players[e].lives,health:a.data.players[e].health};return t},GameEngine.prototype.increaseScore=function(e){var a=this;a.data.players[e].score+=100,a.data.players[e].money+=100},GameEngine.prototype.getScore=function(e){var a=this,t={score:a.data.players[e].score,money:a.data.players[e].money};return t},GameEngine.prototype.drawBackground=function(){var e=this,a=e.context.createPattern(e.background,"repeat");e.context.fillStyle=a,e.context.fillRect(0,0,window.innerWidth,window.innerHeight)},GameEngine.prototype.drawPlayers=function(){var e=this;if(e.updatePlayersCoordinates(),e.data.players)for(var a in e.data.players)if(e.data.players[a].alive){e.context.save(),e.context.translate(e.data.players[a].coordinates.x,e.data.players[a].coordinates.y),e.context.rotate(e.data.players[a].velocity.rotation);var t=new Image;t.src=e.data.players[a].car.model.image,e.context.drawImage(t,0,0,60,60,-30,-30,60,60),e.context.restore()}},GameEngine.prototype.updatePlayersCoordinates=function(){var e=this;if(e.data.players)for(var a in e.data.players)e.data.players[a].alive&&(e.data.players[a].velocity.x*=e.data.players[a].friction,e.data.players[a].velocity.y*=e.data.players[a].friction,e.data.players[a].coordinates.x+=.5*e.data.players[a].velocity.x*e.data.players[a].car.model.speed,e.data.players[a].coordinates.y+=.5*e.data.players[a].velocity.y*e.data.players[a].car.model.speed,e.data.players[a].coordinates.x<0&&(e.data.players[a].coordinates.x=0),e.data.players[a].coordinates.x>window.innerWidth&&(e.data.players[a].coordinates.x=window.innerWidth),e.data.players[a].coordinates.y<0&&(e.data.players[a].coordinates.y=0),e.data.players[a].coordinates.y>window.innerHeight&&(e.data.players[a].coordinates.y=window.innerHeight))},GameEngine.prototype.deleteBullets=function(){for(var e=this,a=0;a<e.bullets.length;a++)(e.bullets[a].coordinates.x<0||e.bullets[a].coordinates.x>window.innerWidth||e.bullets[a].coordinates.y<0||e.bullets[a].coordinates.y>window.innerHeight)&&e.bullets.splice(a,1)},GameEngine.prototype.drawBullets=function(){for(var e=this,a=0;a<e.bullets.length;a++)e.bullets[a].updateCoords(),e.context.fillStyle="#ffffff",e.context.beginPath(),e.context.arc(e.bullets[a].coordinates.x,e.bullets[a].coordinates.y,e.bullets[a].radius,0,2*Math.PI,!0),e.context.fill()},GameEngine.prototype.collisionDetection=function(){var e=this;if(e.data.players)for(var a in e.data.players)if(e.data.players[a].alive)for(var t=0;t<e.bullets.length;t++)if(e.objectCollision(e.data.players[a].coordinates.x,e.data.players[a].coordinates.y,2*e.data.players[a].radius,2*e.data.players[a].radius,e.bullets[t].coordinates.x,e.bullets[t].coordinates.y,e.bullets[t].radius,e.bullets[t].radius)&&e.bullets[t].id!=a){e.reduceHealth(a),e.increaseScore(e.bullets[t].id);var r={attacker:{id:e.bullets[t].id,scoreAndMoney:e.getScore(e.bullets[t].id)},victim:{id:a,healthAndLives:e.getHealth(a)}};socket.emit("feedHealthAndScore",r),e.bullets.splice(t,1)}},GameEngine.prototype.numbOfAlivePlayers=function(){var e=this;return e.numberOfAlivePlayers},GameEngine.prototype.objectCollision=function(e,a,t,r,i,n,o,s){return o+=i,t+=e,i>t||e>o?!1:(s+=n,r+=a,n>r||a>s?!1:!0)};var GameEngine=new GameEngine;