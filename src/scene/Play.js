class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload(){
        this.load.image('background', './assets/background.png');           // preload background
        this.load.image('crack', './assets/crack.png');
        this.load.image('pothole', './assets/pothole.png');
        this.load.image('car', './assets/first_draft_car.png');
        this.load.image('car2', './assets/red_car.png');
        this.load.image('heart', './assets/heart.png');
        this.load.image('lightConeLow', './assets/flash_light_no_powerup.png');
        this.load.spritesheet('player', './assets/sprite4.png', {frameWidth: 38.4815, frameHeight: 50, startFrame: 0, endFrame: 2});      //  preload character
        this.load.audio('thud', './assets/Cupboard Door Close-SoundBible.com-399662278.mp3');
        this.load.audio('bgm', './assets/Wind-Mark_DiAngelo.mp3');
    }

    create(){
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        // place background
        this.background = this.add.tileSprite(0, 0, WIDTH, HEIGHT, 'background').setOrigin(0,0).setDepth(-1);
        this.bgm = this.sound.add('bgm');
        this.bgm.play();
        this.obstacleGroup = this.add.group({
            runChildUpdate: true
        });
        this.addObstacle(1);
        this.flashlight = new Flashlight(this, -300, 0, 'lightConeLow').setScale(0.5, 0.5).setOrigin(0,0).setDepth(0);
        this.character = new Character(this, WIDTH/2-10, HEIGHT - 120, 'player').setScale(0.5, 0.5).setOrigin(0,0); // order of creation matters

        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 1, first: 0}),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'flash',
            frames: this.anims.generateFrameNumbers('player', {start: 0, end: 4, first: 0}),
            frameRate: 5,
            repeat: -1
        });
        this.gameOver = false;

        this.character.anims.play('walk');

        level = 0;
        //let previousLevel = 0
        //currentTime = this.text(500, 100, `${level}s`, { fontFamily: 'Informal Roman', fontSize: '48px', color: '#8a0303' }).setOrigin(0.5);

        this.difficultyTimer = this.time.addEvent({
            delay: 1000,
            callback: this.levelBump,
            callbackScope: this,
            loop: true,
        });  
        this.heartsLeft = game.settings.hearts;
        
        
    }

    addObstacle(num){
        if(num == 1){
            let pothole = new Obstacle(this, Phaser.Math.Between(188, 378), -40, 'pothole').setOrigin(0,0).setDepth(-1);
            this.obstacleGroup.add(pothole);
            obstacleArray = this.obstacleGroup.getChildren();
        } else if (num == 2){
            let car = new Obstacle(this, Phaser.Math.Between(188, 378), -40, 'car').setOrigin(0,0).setDepth(-1);
            this.obstacleGroup.add(car);
            obstacleArray = this.obstacleGroup.getChildren();
        } else if (num == 3){
            let car2 = new Obstacle(this, Phaser.Math.Between(188, 378), -40, 'car2').setOrigin(0,0).setDepth(-1);
            this.obstacleGroup.add(car);
            obstacleArray = this.obstacleGroup.getChildren();
        }
    }

    update(){
        this.background.tilePositionY -= game.settings.startSpeed;
        //currentTime = this.text(500, 100, `${level}s`, { fontFamily: 'Informal Roman', fontSize: '48px', color: '#8a0303' }).setOrigin(0.5);

        if(!this.gameOver){
            this.flashlight.update();
            this.character.update();
        }
        if(this.gameOver){
            this.scene.start("gameOverScene");
        }

        this.checkCollision(this.character, obstacleArray);
    }

    checkCollision(character, obstacleGroup) {
        // simple AABB checking
        for(let i = 0; i < obstacleGroup.length; i++){
            if (character.x < obstacleGroup[i].x + obstacleGroup[i].width && 
                character.x + character.width > obstacleGroup[i].x && 
                character.y < obstacleGroup[i].y + obstacleGroup[i].height &&
                character.height + character.y > obstacleGroup[i]. y){
                    this.loseLife(this.character, obstacleGroup[i]);
                }
        }
    }

    levelBump() {
        level++;

        if(level % 3 == 0 && game.settings.startSpeed < 3.5){
            game.settings.startSpeed += 0.1
        }
        if(level == 12){
            this.addObstacle(1);
        }

        if(level == 24){
            this.addObstacle(1);
        }

        if(level == 36){
            this.addObstacle(2);
        }
    }
    // Makes character lose life, and set gameover to true
    loseLife(character, obstacle){
        this.sfx = this.sound.add('thud');
        this.sfx.play();
        this.heartsLeft--;
        obstacle.reset();
        if(this.heartsLeft == 0){
            this.gameOver = true;
        }
        console.log(gameOver);
        character.play('flash');

        this.flashTime = this.time.delayedCall(3000, () => {
            this.character.play('walk');
        }, null, this);

        console.log(this.heartsLeft);
    }


}