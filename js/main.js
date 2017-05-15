let GameState = {

  preload: function() {
    this.load.image('square','assets/images/square-blue.png');
    this.load.image('ball','assets/images/ball.png');
  },

  create: function() {
    this.cursors = this.game.input.keyboard.createCursorKeys();
    this.HORIZONTAL_SPEED = 100;

    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.physics.arcade.gravity.y = 1000;

    this.square = this.add.sprite(200,300,'square');
    this.square.scale.setTo(0.15);

    this.ball = this.add.sprite(200,200,'ball');
    this.ball.anchor.setTo(0.5);
    this.game.physics.arcade.enable(this.ball);
    this.ball.body.collideWorldBounds = true;
    this.camera.follow(this.ball);
  },

  update: function() {
    if (this.cursors.left.isDown) {
      this.ball.body.velocity.x = -this.HORIZONTAL_SPEED;
    }
    else if (this.cursors.right.isDown) {
      this.ball.body.velocity.x = this.HORIZONTAL_SPEED;
    }

    if (this.ball.body.velocity.x === -this.HORIZONTAL_SPEED) {
      this.ball.angle -= 10;
    }
    else if (this.ball.body.velocity.x === this.HORIZONTAL_SPEED) {
      this.ball.angle += 10;
    }
  }

};

let game = new Phaser.Game(400,600, Phaser.AUTO);

game.state.add('GameState',GameState);
game.state.start('GameState');
