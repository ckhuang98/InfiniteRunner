// game confi obj
let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [ Play ]
}

// main game object
let game = new Phaser.Game(config);

let WIDTH = game.config.width;
let HEIGHT = game.config.height;

game.settings = {
    startSpeed: 0.2
}