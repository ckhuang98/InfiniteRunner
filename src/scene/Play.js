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
        this.load.audio('thud', './assets/Cupboard_Door_Close.mp3');
        this.load.audio('bgm', './assets/Wind-Mark_DiAngelo.mp3');
        this.load.audio('growl', '/assets/Monster_Growl.mp3');
        this.load.audio('background', '/assets/backgroundnoise.mp3');
    }

    create(){

        this.counter = 0;
        // Create key variables
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);    

        // place background & play background music
        this.background = this.add.tileSprite(0, 0, WIDTH, HEIGHT, 'background').setOrigin(0,0).setDepth(-1);
        this.bgm = this.sound.add('bgm');
        this.bgm.loop = true;
        this.bgm.play();

        // Create a physics group for obstacles
        this.obstacleGroup = this.physics.add.group({
            runChildUpdate: true
        });
        this.obstacleGroup.enableBody = true;
        this.obstacleGroup.physicsBodyType = Phaser.Physics.ARCADE;

        this.obstacleArray;
        // Add one default obstacle
        this.addObstacle(Phaser.Math.Between(1,3));

        this.flashlight = new Flashlight(this, -300, 0, 'lightConeLow').setScale(0.5, 0.5).setOrigin(0,0).setDepth(0);
        this.character = new Character(this, WIDTH/2-10, HEIGHT - 120, 'player').setScale(0.5, 0.5).setOrigin(0,0); // order of creation matters
        //this.character.body.setSize(38, 22).setOffset(2, 24);

        gameOver = false;

        level = 0;
        //let previousLevel = 0
        currentTime = this.add.text(500, 100, `${level}s`, { fontFamily: 'Informal Roman', fontSize: '60px', color: '#8a0303' }).setOrigin(0.5);

        this.difficultyTimer = this.time.addEvent({
            delay: 100,
            callback: this.levelBump,
            callbackScope: this,
            loop: true,
        });

        this.spawnTimerMs= 0;

        this.heart = this.add.image(50, 80, 'heart').setOrigin(0.0);
        
        this.currentHearts = this.add.text(145, 95, `x${this.character.heartsLeft}  `, { fontFamily: 'Informal Roman', fontSize: '56px', color: '#8a0303' }).setOrigin(0.5);
        
    }

    addObstacle(num){
        if(num == 1){
            let pothole = new Obstacle(this, Phaser.Math.Between(188, 378), -150, 'pothole').setOrigin(0,0).setDepth(-1);
            // set collision box
            pothole.body.setSize(32,32);
            this.obstacleGroup.add(pothole, true);
            this.obstacleArray = this.obstacleGroup.getChildren();
        } else if (num == 2){
            let car = new Obstacle(this, Phaser.Math.Between(188, 378), -150, 'car').setOrigin(0,0).setDepth(-1);
            car.body.setSize(50,60);
            this.obstacleGroup.add(car, true);
            this.obstacleArray = this.obstacleGroup.getChildren();
        } else if (num == 3){
            let car2 = new Obstacle(this, Phaser.Math.Between(188, 378), -150, 'car2').setOrigin(0,0).setDepth(-1);
            car2.body.setSize(50,60);
            this.obstacleGroup.add(car2, true);
            this.obstacleArray = this.obstacleGroup.getChildren();
        }
    }

    update(){
        this.background.tilePositionY -= game.settings.startSpeed;
        currentTime.setText(`${level}s`);
        

        if(!gameOver){
            this.flashlight.update();
            this.character.update();
            this.physics.overlap(this.character, this.obstacleGroup, this.collisionHandler, null, this);
        }
        if(gameOver){
            game.settings.startSpeed = 1;
            this.scene.start("gameOverScene");
        } 
    }

    levelBump() {
        this.spawnTimerMs += 100;

        if(this.spawnTimerMs % 1000 == 0){
            level++;
        }

        if(this.spawnTimerMs <= 12000 && this.spawnTimerMs % 1200 == 0){
            this.addObstacle(Phaser.Math.Between(1,3));
        } 
        if(this.spawnTimerMs > 12000 && this.spawnTimerMs <= 24000 &&this.spawnTimerMs % 1000 == 0){
            this.addObstacle(Phaser.Math.Between(1,3));
        }
        if(this.spawnTimerMs > 24000 && this.spawnTimerMs <= 36000 &&this.spawnTimerMs % 750 == 0){
            this.addObstacle(Phaser.Math.Between(1,3));
        }
        if(this.spawnTimerMs > 36000 && this.spawnTimerMs % 500 == 0){
            this.addObstacle(Phaser.Math.Between(1,3));
        }

        if(this.spawnTimerMs % 3000 == 0 && game.settings.startSpeed < 3.5){
            game.settings.startSpeed += 0.1
        }
    }
    collisionHandler(player, obstacle){
        obstacle.destroy();
        player.loseLife();
    }
}