// game confi obj
let config = {
    type: Phaser.CANVAS,
    width: 600,
    height: 600,
    scene: [Menu, Play  ]
}

// main game object
let game = new Phaser.Game(config);

let WIDTH = game.config.width;
let HEIGHT = game.config.height;
let gameOver = false;
game.easyMode = true;

let keyLEFT, keyRIGHT, keyUP, keySPACE;

game.settings = {
    startSpeed: 1
}