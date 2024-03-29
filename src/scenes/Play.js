class Play extends Phaser.Scene {
  constructor() {
    super("playScene");
  }

  preload() {
    // load images/tile sprites
    this.load.image('bonusUfo', './assets/bonusUfo.png');
    this.load.image('rocket', './assets/rocket.png');
    this.load.image('spaceship', './assets/spaceship.png');
    this.load.image('starfield', './assets/starfield.png');

    // load spritesheet
    this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
  }
  
  create() {
    // place tile sprite
    this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);
    // green UI background
    this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0);
    // white borders
    this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
    this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
    this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
    this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
    // add rocket (p1)
    this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(-2, 0);
    // add rocket (p2)
    this.p2Rocket = new Rocket2(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(2, 0);
    // add bonusUfo
    this.ufo = new BonusUfo(this, game.config.width + borderUISize*5.5, borderUISize*5, 'bonusUfo', 0, 50).setOrigin(0, 0);
    // add spaceships (x3)
    this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'spaceship', 0, 30).setOrigin(0, 0);
    this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'spaceship', 0, 20).setOrigin(0,0);
    this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'spaceship', 0, 10).setOrigin(0,0);
    // define menu key
    keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    // define keys (p1)
    keyZ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
    keyX = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);
    keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
    keyV = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.V);
    // define keys (p2)
    keyH = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H);
    keyJ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);
    keyK = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K);
    keyL = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L);
    // animation config
    this.anims.create({
      key: 'explode',
      frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
      frameRate: 30
    });

    // initialize score
    this.p1Score = 0;
    // initialize clock to display
    this.countDown = game.settings.gameTimer / 10;

    // display score
    let scoreConfig = {
      fontFamily: 'Courier',
      fontSize: '28px',
      backgroundColor: '#F3B141',
      color: '#843605',
      align: 'right',
      padding: {
        top: 5,
        bottom: 5,
      },
      fixedWidth: 100
    }
    this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);
    
    // GAME OVER flag
    this.gameOver = false;

    scoreConfig.fixedWidth = 0;

    let timeConfig = {
      fontFamily: 'Courier',
      fontSize: '28px',
      backgroundColor: '#F3B141',
      color: '#843605',
      align: 'right',
      padding: {
        top: 5,
        bottom: 5,
      },
      fixedWidth:100
    }
    this.timeLeft = this.add.text(borderUISize + borderPadding, borderUISize*2 + borderPadding*3, this.countDown, timeConfig);
  }

  update() {
    // check key input for restart
    if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
      this.scene.restart();
    }
    if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
      this.scene.start("menuScene");
    }
    
    if (!this.gameOver) {
      this.starfield.tilePositionX -= 4;
      this.p1Rocket.update();             // update rocket sprite
      this.p2Rocket.update();             // update rocket2 sprite
      this.ufo.update();                  // update ufo sprite
      this.ship01.update();               // update spaceships (x3)
      this.ship02.update();
      this.ship03.update();
      this.countDown--;                   // update time
      this.displayTime = Math.floor(this.countDown / 100);
      this.timeLeft.text = this.displayTime;
    }

    // check for countdown
    if (this.countDown == 0)
    {
      this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER').setOrigin(0.5);
      this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or <- for Menu').setOrigin(0.5);
      this.gameOver = true;
    }

    // check collisions (p1)
    if(this.checkCollision(this.p1Rocket, this.ufo)) {
      this.p1Rocket.reset();
      this.shipExplode(this.ufo);   
    }
    if(this.checkCollision(this.p1Rocket, this.ship03)) {
      this.p1Rocket.reset();
      this.shipExplode(this.ship03);   
    }
    if (this.checkCollision(this.p1Rocket, this.ship02)) {
      this.p1Rocket.reset();
      this.shipExplode(this.ship02);
    }
    if (this.checkCollision(this.p1Rocket, this.ship01)) {
      this.p1Rocket.reset();
      this.shipExplode(this.ship01);
    }

    // check collisions (p2)
    if(this.checkCollision(this.p2Rocket, this.ufo)) {
      this.p2Rocket.reset();
      this.shipExplode(this.ufo);   
    }
    if(this.checkCollision(this.p2Rocket, this.ship03)) {
      this.p2Rocket.reset();
      this.shipExplode(this.ship03);   
    }
    if (this.checkCollision(this.p2Rocket, this.ship02)) {
      this.p2Rocket.reset();
      this.shipExplode(this.ship02);
    }
    if (this.checkCollision(this.p2Rocket, this.ship01)) {
      this.p2Rocket.reset();
      this.shipExplode(this.ship01);
    }
  }

  checkCollision(rocket, ship) {
    // simple AABB checking
    if (rocket.x < ship.x + ship.width && 
        rocket.x + rocket.width > ship.x && 
        rocket.y < ship.y + ship.height &&
        rocket.height + rocket.y > ship. y) 
        {
          return true;
        } 
    else {
      return false;
    }
  }

  shipExplode(ship) {
    // temporarily hide ship
    ship.alpha = 0;
    // create explosion sprite at ship's position
    let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
    boom.anims.play('explode');             // play explode animation
    boom.on('animationcomplete', () => {    // callback after anim completes
      ship.reset();                         // reset ship position
      ship.alpha = 1;                       // make ship visible again
      boom.destroy();                       // remove explosion sprite
    });
    
    // score add and repaint
    this.p1Score += ship.points;
    this.scoreLeft.text = this.p1Score;
    this.countDown += 300;      // landing a hit adds 3 seconds
    this.sound.play('sfx_explosion');     
  }
}