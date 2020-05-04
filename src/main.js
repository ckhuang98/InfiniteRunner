/* Header

Group Members:
Cary Huang
Philip Cook
Claire Camomile

Game Title:
Alone in the Dark

Date Completed:
05/03/2020

Creative Tilt:
Technical-wise, I spent quite some time implementing the random spawn of obstacles, and it wasn't from copying class examples. 
Philip spent quite some time as well creating a scoring system and display time with minutes and seconds rather than just seconds.

Creative-wise, Claire and Philip made all the art work, and we came up with the flashlight in the dark theme, which is a nice twist
to just running and dodging obstacles. Philip also created the monster as well.


*/

// game confi obj
let config = {
    type: Phaser.CANVAS,
    width: 600,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: [Menu, Play, PlayHard, GameOver ]
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