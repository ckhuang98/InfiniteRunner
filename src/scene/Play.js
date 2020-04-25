class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload(){
        this.load.image('background', './assets/background.png');
    }

    create(){
        this.background = this.add.tileSprite(0, 0, WIDTH, HEIGHT, 'background').setOrigin(0,0);
    }

    update(){
        this.background.tilePositionY -= game.settings.startSpeed;
    }
}