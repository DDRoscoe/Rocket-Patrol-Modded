// Name: Jalen Pastor
// Project Name: Rocket Patrol Modded
// Date: 28 June, 2021
// Estimated Time of Completion: 6-8 hours

//------------ MODS -------------
// Completed Tutorial (20)
// Implement a simultaneous two-player Mode (30)
// Implement a new timing/scoring mechanism that adds time to the clock for successful hits (20)
// Create a new spaceship that's smaller, moves faster, and is worth more points (20)
// Display time (in seconds) on the screen (10)
//-------------------------------

// Sources: The only outside source I used was a game asset I paid for from Unity (it was used as the bonusUfo.png)

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