/* 
Group members: Claire Camomile, Philip Cook, Cary Huang
Game tile: Alone in the Dark
Date completed: 5/3/2020
Creative Tilt(Technical): We added a high score to track the minutes and seconds from a timer 
that was not shown in class, and developed a spawning algorithm for obstacles in the game that was not covered in class.
Creative Tilt(Artistic): Our endless runner has it's own style as we created completely original art 
with the exception of all sound assets, which are cited below. We attempted something new with our endless 
runner by having the gameplay be dependent on a light mechanic which only allowed the player to 
see a portion of the screen. The menu and game over screen were meant to give off an eerie effect to add to the visual style. */


/*
Works Cited
Menu Theme song - “Monster In The Field” by Fesliyan Studios 
./assets/menuSound.mp3 
https://www.fesliyanstudios.com/royalty-free-music/downloads-c/scary-horror-music/8
Menu clicking sound - "Click" by Mike Koenig
./assets/press.mp3
http://soundbible.com/783-Click.html
Collision sound - “Cupboard Door Close” by Caroline Ford
./assets/Cupboard_Door_Close.mp3
http://soundbible.com/1442-Cupboard-Door-Close.html
Growling sound - “Monster Roar Sound” by thecheeseman
./assets/Monster_Growl.mp3
http://soundbible.com/1458-Monster-Roar.html
Game Over sound - “130Speed Dun Dun Dun V1 From Sound Effect” by Fesilyan Studios
./assets/GameOver.mp3
https://www.fesliyanstudios.com/royalty-free-sound-effects-download/dun-dun-dun-248
Gameplay sound - "The Chase" by Joshua Empyre
./assets/backgroundMusic.mp3 and ./assets/backgroundLoop.mp3
https://freesound.org/people/joshuaempyre/sounds/478120/ */

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