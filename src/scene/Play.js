class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload(){
        this.load.image('background', './assets/background.png');           // preload background
        this.load.image('crack', './assets/crack.png');
        this.load.image('pothole', './assets/pothole.png');
        this.load.image('car', './assets/first_draft_car.png');
        this.load.image('lightConeLow', './assets/flash_light_no_powerup.png');
        this.load.spritesheet('player', './assets/sprite4.png', {frameWidth: 38.4815, frameHeight: 50, startFrame: 0, endFrame: 2});      //  preload character
    }

    create(){
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        // place background
        this.background = this.add.tileSprite(0, 0, WIDTH, HEIGHT, 'background').setOrigin(0,0);
        this.pothole = new Obstacle(this, WIDTH/2, 0, 'pothole').setOrigin(0,0);
        this.flashlight = new Flashlight(this, -300, 0, 'lightConeLow').setScale(0.5, 0.5).setOrigin(0,0); // needs a separate class
        this.character = new Character(this, WIDTH/2-10, HEIGHT - 120, 'player').setScale(0.5, 0.5).setOrigin(0,0); // order of creation matters

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
            this.flashlight.update();
            this.character.update();
            this.pothole.update();
        }
    }

}