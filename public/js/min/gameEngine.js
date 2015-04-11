"use strict";function GameEngine(){var t=document.querySelector(".js--game-canvas");this.rAFId,this.data={},this.bullets=[],this.canvas=createEle(!1,"canvas"),this.canvas.width=window.innerWidth,this.canvas.height=window.innerHeight,this.context=this.canvas.getContext("2d"),t.appendChild(this.canvas)}GameEngine.prototype.loop=function(){var t=this;this.rAFId=window.requestAnimationFrame(t.loop.bind(this)),this.context.clearRect(0,0,this.canvas.width,this.canvas.height),t.deleteBullets(),t.drawPlayers(),t.drawBullets(),t.collisionDetection()},GameEngine.prototype.start=function(){var t=this;t.rAFId||t.loop()},GameEngine.prototype.stop=function(){var t=this;t.rAFId&&(window.cancelAnimationFrame(t.rAFId),t.rAFId=void 0)},GameEngine.prototype.feedPlayers=function(t){var e=this;e.data.players=t},GameEngine.prototype.feedBullets=function(t){var e=this;e.bullets.push(new Bullet(t.id,t.coordinates.x,t.coordinates.y,t.rotation))},GameEngine.prototype.drawPlayers=function(){var t=this;if(t.data.players)for(var e in t.data.players)t.context.fillStyle="#ffffff",t.context.beginPath(),t.context.arc(t.data.players[e].coordinates.x,t.data.players[e].coordinates.y,30,0,2*Math.PI,!0),t.context.fill()},GameEngine.prototype.deleteBullets=function(){for(var t=this,e=0;e<t.bullets.length;e++)(t.bullets[e].coordinates.x<0||t.bullets[e].coordinates.x>window.innerWidth||t.bullets[e].coordinates.y<0||t.bullets[e].coordinates.y>window.innerHeight)&&t.bullets.splice(e,1)},GameEngine.prototype.drawBullets=function(){for(var t=this,e=0;e<t.bullets.length;e++)t.bullets[e].updateCoords(),t.context.fillStyle="#ffffff",t.context.beginPath(),t.context.arc(t.bullets[e].coordinates.x,t.bullets[e].coordinates.y,t.bullets[e].radius,0,2*Math.PI,!0),t.context.fill()},GameEngine.prototype.collisionDetection=function(){},GameEngine.prototype.objectCollision=function(t,e,n,i,o,a,s,l){return s+=o,n+=t,o>n||t>s?!1:(l+=a,i+=e,a>i||e>l?!1:!0)};var GameEngine=new GameEngine;