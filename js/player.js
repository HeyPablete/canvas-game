function Player(game) {
  this.x = 50;
  this.y0 = 500;
  this.y = this.y0;
  this.game = game;

  this.vy = 0;
  this.g = 0.3;

  this.width = 50;
  this.height = 100;

  this.img = new Image();
  this.img.src = "img/player.png";
  this.img.frames = 3;
  this.img.frameIndex = 1;
  this.bullets = [];
  this.setListeners();
}

Player.prototype.draw = function() {
  this.game.ctx.drawImage(
    this.img,
    this.img.frameIndex * (this.img.width / this.img.frames),
    0,
    this.img.width / this.img.frames,
    this.img.height,
    this.x,
    this.y,
    this.width,
    this.height
  );

  this.bullets.forEach(function(b) {
    b.draw();
  });

  this.bullets = this.bullets.filter(function(b) {
    return b.x < this.game.canvas.width;
  }.bind(this));

  if (this.game.framesCounter % 10 == 0) {
    this.img.frameIndex += 1;
  }

  if (this.img.frameIndex == 3) {
    this.img.frameIndex = 0;
  }
};

Player.prototype.setListeners = function() {
  document.onkeydown = function(e) {
    if (e.keyCode == 38 && this.vy === 0) {
      this.vy -= 10;
      this.y -= 20;
    } else if (e.keyCode === 32) {
      this.shoot();
    }
  }.bind(this);
};

Player.prototype.shoot = function() {
  this.bullets.push(new Bullet(this.game));
};

Player.prototype.animateImg = function() {};

Player.prototype.move = function() {
  if (this.y < this.y0) {
    this.vy += this.g;
    this.y += this.vy;
  } else {
    this.vy = 0;
    this.y = this.y0;
  }
  this.bullets.forEach(function(b) {
    b.move();
  });
};
