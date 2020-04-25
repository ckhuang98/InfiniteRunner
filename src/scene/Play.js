class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload(){
        this.load.image('background', './assets/background.png');           // preload background
        this.load.spritesheet('player', './assets/sprite4.png', {frameWidth: 76.963, frameHeight: 91.9769, startFrame: 0, endFrame: 2});      //  preload character
    }

    create(){
        // place background
        this.background = this.add.tileSprite(0, 0, WIDTH, HEIGHT, 'background').setOrigin(0,0);

        this.player = this.add.sprite(WIDTH/2 -32, HEIGHT - 120, 'player').setScale(0.5, 0.5).setOrigin(0,0);

        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 1, first: 0}),
            frameRate: 5,
            repeat: -1
        });

        this.player.anims.play('walk');

        this.player.on('animationcomplet', () => {
            this.player.anims.play('walk');
        });

    }

    update(){
        this.background.tilePositionY -= game.settings.startSpeed;
    }

}