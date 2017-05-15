let GameState = {

  preload: function() {
    this.load.image('square','assets/images/square-blue.png');
    this.load.image('ball','assets/images/ball.png');
  },

  create: function() {
    this.cursors = this.game.input.keyboard.createCursorKeys();
    this.HORIZONTAL_SPEED = 300;
    this.SQUARE_LENGTH = 50;

    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.physics.arcade.gravity.y = 1000;

    this.ball = this.add.sprite(50,50,'ball');
    this.ball.anchor.setTo(0.5);
    this.ball.scale.setTo(1.2);
    this.game.physics.arcade.enable(this.ball);
    this.ball.body.collideWorldBounds = true;
    this.camera.follow(this.ball);

    this.squares = this.game.add.group();
    this.squares.enableBody = true;

    // for (let i = 0; i < this.game.width / this.SQUARE_LENGTH; i++) {
    //   this.addSquare(i * this.SQUARE_LENGTH, 100);
    // }

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

    this.game.physics.arcade.collide(this.ball, this.squares);
  },

  addSquare: function(x,y) {
    let square = this.squares.create(x,y,'square');
    this.game.physics.arcade.enable(square);

    square.width = this.SQUARE_LENGTH;
    square.height = this.SQUARE_LENGTH;
    // square.enableBody = true;
    square.body.immovable = true;
    square.body.allowGravity = false;
  },

  addRowOfSquares: function() {

  }

};

let game = new Phaser.Game(400,600, Phaser.AUTO);

game.state.add('GameState',GameState);
game.state.start('GameState');
