class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload(){
        this.load.image('background', './assets/background.png');           // preload background
        this.load.image('crack', './assets/crack.png');
        this.load.image('pothole', './assets/pothole.png');
        this.load.image('car', './assets/first_draft_car.png');
        this.load.image('heart', './assets/heart.png');
        this.load.image('lightConeLow', './assets/flash_light_no_powerup.png');
        this.load.spritesheet('player', './assets/sprite4.png', {frameWidth: 38.4815, frameHeight: 50, startFrame: 0, endFrame: 2});      //  preload character
        this.load.audio('thud', './assets/Cupboard Door Close-SoundBible.com-399662278.mp3');
        this.load.audio('growl', './assets/Monster Growl-SoundBible.com-2140541932.mp3');

    }

    create(){
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        // place background
        this.background = this.add.tileSprite(0, 0, WIDTH, HEIGHT, 'background').setOrigin(0,0);
        this.pothole = new Obstacle(this, WIDTH/2, 0, 'pothole').setOrigin(0,0);
        this.flashlight = new Flashlight(this, -300, 0, 'lightConeLow').setScale(0.5, 0.5).setOrigin(0,0);
        this.character = new Character(this, WIDTH/2-10, HEIGHT - 120, 'player').setScale(0.5, 0.5).setOrigin(0,0); // order of creation matters

        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 1, first: 0}),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'flash',
            frames: this.anims.generateFrameNumbers('player', {start: 0, end: 5, first: 0}),
            frameRate: 5,
            repeat: -1
        });
        this.gameOver = false;

        this.character.anims.play('walk');

        level = 0;
        //let previousLevel = 0
        //let currentTime = this.add.text(500, 100, `${level}s`, { fontFamily: 'Informal Roman', fontSize: '48px', color: '#8a0303' }).setOrigin(0.5);

        this.difficultyTimer = this.time.addEvent({
            delay: 1000,
            callback: this.levelBump,
            callbackScope: this,
            loop: true,
        });  
        this.heartsLeft = game.settings.hearts;
        
        
    }

    update(){
        this.background.tilePositionY -= game.settings.startSpeed;
        //this.add.text(500, 100, `${level}s`, { fontFamily: 'Informal Roman', fontSize: '48px', color: '#8a0303' }).setOrigin(0.5); // broken timer

        if(!this.gameOver){
            this.flashlight.update();
            this.character.update();
            this.pothole.update();
        }else{
            this.scene.start("gameOverScene");
        }
        if(this.checkCollision(this.character, this.pothole)){
            this.loseLife(this.character, this.pothole);
        }
    }


    checkCollision(character, obstacle) {
        // simple AABB checking
        if (character.x < obstacle.x + obstacle.width && 
            character.x + character.width > obstacle.x && 
            character.y < obstacle.y + obstacle.height &&
            character.height + character.y > obstacle. y) {
                this.gameOver = true;
                return true;
                
                
        } else {
            return false;
        }
    }

    levelBump() {
        level++;   
    }
    // Makes character lose life, and set gameover to true
    loseLife(character, obstacle){
        this.heartsLeft--;
        obstacle.reset();
        if(this.heartsLeft == 0){
            gameOver = true;
        }
        character.play('flash');

        this.flashTime = this.time.delayedCall(3000, () => {
            this.character.play('walk');
        }, null, this);
        console.log(this.heartsLeft);

    }
}