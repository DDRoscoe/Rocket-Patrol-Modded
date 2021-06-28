let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [Menu, Play]
}

let game = new Phaser.Game(config);
// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

// reserve menu vars
let keyLEFT, keyRIGHT, keyR;

// reserve p1 vars
let keyZ, keyX, keyC, keyV;

// reserve p2 vars
let keyH, keyJ, keyK, keyL;