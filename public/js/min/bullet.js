"use strict";function Bullet(t,i,o,e){this.id=t,this.coordinates={x:i,y:o,direction:-e+.2*Math.random()},this.radius=3,this.velocity=15}Bullet.prototype.updateCoords=function(){var t=this;t.coordinates.x+=Math.sin(t.coordinates.direction)*t.velocity,t.coordinates.y+=Math.cos(t.coordinates.direction)*t.velocity};