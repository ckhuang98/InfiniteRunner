class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload(){
        this.load.image('background', './assets/background.png');           // preload background
        this.load.spritesheet('player', './assets/sprite4.png', {frameWidth: 76.963, frameHeight: 91.9769, startFrame: 0, endFrame: 2});      //  preload character
        this.load.image('crack', './assets/crack.png');
        this.load.image('pothole', './assets/pothole.png');
        this.load.image('car', './assets/first_draft_car.png');
    }

    create(){
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        // place background
        this.background = this.add.tileSprite(0, 0, WIDTH, HEIGHT, 'background').setOrigin(0,0);

        this.character = new Character(this, WIDTH/2 -20, HEIGHT - 120, 'player').setScale(0.5, 0.5).setOrigin(0,0);
        this.pothole = new Obstacle(this, WIDTH/2, 0, 'pothole').setOrigin(0,0);

        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 1, first: 0}),
            frameRate: 5,
            repeat: -1
        });

        this.character.anims.play('walk');
    }

    update(){
        this.background.tilePositionY -= game.settings.startSpeed;

        if(!gameOver){
            this.character.update();
            this.pothole.update();
        }
    }

}