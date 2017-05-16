let GameState = {

  init: function() {

  },

  preload: function() {
    this.load.image('square','assets/images/square-blue.png');
    this.load.image('ball','assets/images/ball.png');
  },

  create: function() {
    if (localStorage.hiscore === undefined) {
      localStorage.hiScore = 0;
    }
    this.cursors = this.game.input.keyboard.createCursorKeys();
    this.HORIZONTAL_SPEED = 300;
    this.SQUARE_WIDTH = 60;
    this.SQUARE_HEIGHT = 15;
    this.PLATFORM_VELOC = 160;

    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.physics.arcade.gravity.y = 2000;

    this.ball = this.add.sprite(this.game.width / 2, 350,'ball');
    this.game.physics.arcade.enable(this.ball);
    this.ball.anchor.setTo(0.5);
    this.ball.scale.setTo(0.8);
    this.ball.body.collideWorldBounds = true;
    this.camera.follow(this.ball);

    this.squares = this.game.add.group();
    this.squares.enableBody = true;
    this.addRowOfSquares(550);
    this.timer = game.time.events.loop(600, this.addRowOfSquares, this);

    // this.score = 0;
    // this.scoreLabel = game.add.text(20,20, '0',{font: '30px Arial', fill: '#ffffff'});
    // console.log(this.scoreLabel);
    // this.hiScoreBanner = game.add.text(240, 24, 'High score: ',{font: '22px Arial', fill: '#ffffff'});
    // this.hiScoreLabel = game.add.text(360, 20, parseInt(localStorage.hiScore),{font: '30px Arial', fill: '#ffffff'});
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

    if (this.ball.y - (this.ball.height / 2) === 0) {
      this.game.state.start('GameState')
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

  addRowOfSquares: function(y) {
    let yPos = y;
    let hole = Math.floor(Math.random() * 6) + 1;
    while (hole === this.lastHole) {
      hole = Math.floor(Math.random() * 6 + 1);
    }
    this.lastHole = hole;

    if (yPos === undefined) {
      yPos = this.game.height - this.SQUARE_HEIGHT;
    }

    for (let i = 0; i < this.game.width / this.SQUARE_WIDTH; i++) {
      if (i != hole) {
        this.addSquare(i * this.SQUARE_WIDTH, yPos);
      }
    }

  },

  addPoint: function() {

  }

};

let game = new Phaser.Game(480,600, Phaser.AUTO);

game.state.add('GameState',GameState);
game.state.start('GameState');
