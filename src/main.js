// game confi obj
let config = {
    type: Phaser.CANVAS,
    width: 600,
    height: 600,
    scene: [Menu, Play, GameOver ]
}

// main game object
let game = new Phaser.Game(config);

let WIDTH = game.config.width;
let HEIGHT = game.config.height;
let gameOver = false;
let modeEasy = true;
let modeSet = "";

let currentSecond;
let currentMinute;
let level;
let minute;
let highScore = 0;
let highScoreStr = '00:00';
let obstacleArray;

let keyLEFT, keyRIGHT, keyUP, keySPACE;

game.settings = {
    startSpeed: 1,
    hearts: 5
}