/**
 * Player Class
 */
function Player() {
    this.car = 0;
    this.score = 0;
    this.money = 0;
    this.armor = 0;
    this.speed = 0;
    this.power = 0;
    this.health = 1000;
    this.lives = 5;
    this.disqualified = false;
};

module.exports = Player;