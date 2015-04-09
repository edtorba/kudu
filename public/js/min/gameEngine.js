"use strict";function GameEngine(){var t=document.querySelector(".js--game-canvas");this.rAFId,this.data={},this.canvas=createEle(!1,"canvas"),this.canvas.width=window.innerWidth,this.canvas.height=window.innerHeight,this.context=this.canvas.getContext("2d"),t.appendChild(this.canvas)}GameEngine.prototype.loop=function(){var t=this;this.rAFId=window.requestAnimationFrame(t.loop.bind(this)),this.context.clearRect(0,0,this.canvas.width,this.canvas.height),t.drawPlayers()},GameEngine.prototype.start=function(){var t=this;t.rAFId||t.loop()},GameEngine.prototype.stop=function(){var t=this;t.rAFId&&(window.cancelAnimationFrame(t.rAFId),t.rAFId=void 0)},GameEngine.prototype.feedPlayers=function(t){var a=this;a.data.players=t},GameEngine.prototype.drawPlayers=function(){var t=this;if(t.data.players)for(var a in t.data.players)this.context.fillStyle="#ffffff",this.context.beginPath(),this.context.arc(t.data.players[a].coordinates.x,t.data.players[a].coordinates.y,30,0,2*Math.PI,!0),this.context.fill()};var GameEngine=new GameEngine;