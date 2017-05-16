let GameState = {

  preload: function() {
    this.load.image('square','assets/images/square-blue.png');
    this.load.image('ball','assets/images/ball.png');
  },

  create: function() {
    this.cursors = this.game.input.keyboard.createCursorKeys();
    this.HORIZONTAL_SPEED = 300;
    this.SQUARE_WIDTH = 60;
    this.SQUARE_HEIGHT = 15;
    this.PLATFORM_VELOC = 200;

    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.physics.arcade.gravity.y = 2000;

    this.ball = this.add.sprite(50,200,'ball');
    this.ball.anchor.setTo(0.5);
    this.ball.scale.setTo(0.8);
    this.game.physics.arcade.enable(this.ball);
    this.ball.body.collideWorldBounds = true;
    this.camera.follow(this.ball);

    this.squares = this.game.add.group();
    this.squares.enableBody = true;
    this.timer = game.time.events.loop(500, this.addRowOfSquares, this);

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

    // square.enableBody = true;
    square.width = this.SQUARE_WIDTH;
    square.height = this.SQUARE_HEIGHT;
    square.body.immovable = true;
    square.body.allowGravity = false;
    square.body.velocity.y = -this.PLATFORM_VELOC;
    square.checkWorldBounds = true;
    square.outOfBoundsKill = true;
  },

  addRowOfSquares: function() {
    let hole = Math.floor(Math.random() * 6) + 1;
    while (hole === this.lastHole) {
      hole = Math.floor(Math.random() * 6 + 1);
    }
    this.lastHole = hole;

    for (let i = 0; i < this.game.width / this.SQUARE_WIDTH; i++) {
      if (i != hole) {
        this.addSquare(i * this.SQUARE_WIDTH, this.game.height - this.SQUARE_HEIGHT);
      }
    }
  }

};

let game = new Phaser.Game(480,600, Phaser.AUTO);

game.state.add('GameState',GameState);
game.state.start('GameState');
