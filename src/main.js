// Name: Jalen Pastor
// Project Name: Rocket Patrol Modded
// Date: 28 June, 2021
// Estimated Time of Completion: 6-8 hours

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

// reserve Player1 vars
let keyZ, keyX, keyC, keyV;

// reserve Player2 vars
let keyH, keyJ, keyK, keyL;