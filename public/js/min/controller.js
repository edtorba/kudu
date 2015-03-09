"use strict";function Controller(){this.enabled=!1,this.container=document.querySelector(".js--controller"),this.points=[],this.velocity={x:0,y:0,acceleration:0};var t=this;this.canvas=document.createElement("canvas"),this.canvas.width=window.innerWidth,this.canvas.height=window.innerHeight,this.context=this.canvas.getContext("2d"),this.container.appendChild(this.canvas),this.canvas.addEventListener("touchstart",function(e){t.positionHandler(e,t)},!1),this.canvas.addEventListener("touchmove",function(e){t.positionHandler(e,t)},!1),this.canvas.addEventListener("touchend",function(e){t.positionHandler(e,t),t.enabled=!1},!1)}window.requestAnimFrame=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(t){window.setTimeout(t,1e3/60)},Controller.prototype.positionHandler=function(t,e){t.clientX&&t.clientY?e.points[0]=t:t.targetTouches&&(e.points=t.targetTouches,t.preventDefault())},Controller.prototype.loop=function(){var t=this;this.canvas.height!=window.innerHeight&&(this.canvas.width=window.innerWidth,this.canvas.height=window.innerHeight),this.context.clearRect(0,0,this.canvas.width,this.canvas.height);var e={radius:75,gutter:24,x:function(){return this.radius+this.gutter},y:function(){return window.innerHeight-this.radius-this.gutter}};this.context.strokeStyle="#eee",this.context.lineWidth="10",this.context.beginPath(),this.context.arc(e.x(),e.y(),e.radius,0,2*Math.PI,!0),this.context.stroke();var i={radius:35,x:e.x(),y:e.y()};eachNode(this.points,function(n){var o=Math.pow(e.radius,2),a=Math.pow(e.x()-n.clientX,2)+Math.pow(e.y()-n.clientY,2);if(t.enabled&&(e.x()>n.clientX?t.velocity.x=-1:e.x()<n.clientX&&(t.velocity.x=1),e.y()>n.clientY?t.velocity.y=1:e.y()<n.clientY&&(t.velocity.y=-1)),o>a)t.enabled=!0,t.velocity.acceleration=100*a/o,i.x=n.clientX,i.y=n.clientY;else if(t.enabled){var s=e.x()-n.clientX,c=e.y()-n.clientY,r=Math.sqrt(Math.pow(s,2)+Math.pow(c,2)),h=e.radius/r,l=s*h,d=c*h;i.x=e.x()-l,i.y=e.y()-d,t.velocity.acceleration=100}else t.velocity={x:0,y:0,acceleration:0}}),this.context.beginPath(),this.context.arc(i.x,i.y,i.radius,0,2*Math.PI,!0),this.context.fill()};var Controller=new Controller;!function t(){requestAnimFrame(t),Controller.loop()}();