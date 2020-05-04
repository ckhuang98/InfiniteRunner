// Copies Play.js, with adjustments to speed and spawn rate to account for higher difficulty.
class PlayHard extends Phaser.Scene {
    constructor() {
        super("playHardScene");
    }

    preload(){
        this.load.image('background', './assets/background.png');           // preload background
        this.load.image('crack', './assets/crack.png');
        this.load.image('pothole', './assets/pothole1.png');
        this.load.image('car', './assets/first_draft_car.png');
        this.load.image('car2', './assets/red_car.png');
        this.load.image('heart', './assets/heart.png');
        this.load.image('lightConeLow', './assets/flash_light_no_powerup.png');
        this.load.spritesheet('player', './assets/sprite4.png', {frameWidth: 38.4815, frameHeight: 50, startFrame: 0, endFrame: 2});      //  preload character
        this.load.audio('thud', './assets/Cupboard_Door_Close.mp3');
        this.load.audio('bgm', './assets/backgroundMusic.mp3');
        this.load.audio('newBgm', './assets/backgroundLoop.mp3');
        this.load.atlas('monsterSpriteDark', './assets/monsterSpriteDark.png', './assets/monsterSpriteDark.json');
        this.load.spritesheet('monsterWalk', './assets/monsterSpriteDark.png', {frameWidth: 300, frameHeight: 150, startFrame: 0, endFrame: 1});
    }

    create(){

        // Create key variables
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);    

        // place background & play background music
        this.background = this.add.tileSprite(0, 0, WIDTH, HEIGHT, 'background').setOrigin(0,0).setDepth(-1);
        this.bgm = this.sound.add('bgm');
        this.bgm.play();

        // Create a physics group for obstacles
        this.obstacleGroup = this.physics.add.group({
            runChildUpdate: true
        });
        this.obstacleGroup.enableBody = true;
        this.obstacleGroup.physicsBodyType = Phaser.Physics.ARCADE;

        // Add one starting obstacle
        this.addObstacle(Phaser.Math.Between(1,3));

        this.flashlight = new Flashlight(this, -300, 0, 'lightConeLow').setScale(0.5, 0.5).setOrigin(0,0).setDepth(0);
        this.monster = new Monster(this, WIDTH/2-75, 600, 'monsterWalk').setScale(0.5, 0.5).setOrigin(0,0).setDepth(0);
        this.character = new Character(this, WIDTH/2-10, HEIGHT - 120, 'player').setScale(0.5, 0.5).setOrigin(0,0); // order of creation matters
        //this.character.body.setSize(38, 22).setOffset(2, 24);

        gameOver = false;

        //seconds in game
        level = 0;

        //minutes in game
        minute = 0;

        currentMinute = this.add.text(495, 100, `00: `, { fontFamily: 'Informal Roman', fontSize: '60px', color: '#8a0303' }).setOrigin(0.5);
        currentSecond = this.add.text(560, 100, `00 `, { fontFamily: 'Informal Roman', fontSize: '60px', color: '#8a0303' }).setOrigin(0.5);

        //delays time until a hundred ms has passed then calls levelBump
        this.difficultyTimer = this.time.addEvent({
            delay: 100,
            callback: this.levelBump,
            callbackScope: this,
            loop: true,
        });

        // keeps track of ms for spawn
        this.spawnTimerMs= 0;

        //delays time until a minute has passed then calls minuteBump
        this.difficultyTimer = this.time.addEvent({
            delay: 60000,
            callback: this.minuteBump,
            callbackScope: this,
            loop: true,
        });   

        this.heart = this.add.image(50, 80, 'heart').setOrigin(0.0);
        
        this.currentHearts = this.add.text(145, 95, `x${this.character.heartsLeft}  `, { fontFamily: 'Informal Roman', fontSize: '56px', color: '#8a0303' }).setOrigin(0.5);
        
    }


    update(){
        this.background.tilePositionY -= game.settings.startSpeed;
        if(level % 60 < 10){
            currentSecond.setText(`0${level % 60} `)
        }else{
            currentSecond.setText(`${level % 60} `)
        }

        if(minute < 10){
            currentMinute.setText(`0${minute}: `)
        }else{
            currentMinute.setText(`${minute}: `)
        }

        if(!gameOver){
            this.flashlight.update();
            this.character.update();
            this.monster.update();
            // checks overlap
            this.physics.overlap(this.character, this.obstacleGroup, this.collisionHandler, null, this);
        }else{
            game.settings.startSpeed = 1; // reset speed
            this.scene.start("gameOverScene");
            this.bgm.stop();
        }
    }


    // Add obstacle to obstacle group
    addObstacle(num){
        if(num == 1){
            let pothole = new Obstacle(this, Phaser.Math.Between(180, 378), -150, 'pothole').setOrigin(0,0).setDepth(-1);
            // set collision box
            pothole.body.setSize(48,40);
            this.obstacleGroup.add(pothole, true);
            this.obstacleArray = this.obstacleGroup.getChildren();
        } else if (num == 2){
            let car = new Obstacle(this, Phaser.Math.Between(180, 378), -150, 'car').setOrigin(0,0).setDepth(-1);
            car.body.setSize(50,60);
            this.obstacleGroup.add(car, true);
            this.obstacleArray = this.obstacleGroup.getChildren();
        } else if (num == 3){
            let car2 = new Obstacle(this, Phaser.Math.Between(180, 378), -150, 'car2').setOrigin(0,0).setDepth(-1);
            car2.body.setSize(50,60);
            this.obstacleGroup.add(car2, true);
            this.obstacleArray = this.obstacleGroup.getChildren();
        }
    }

    levelBump() {
        this.spawnTimerMs += 100;

        if(this.spawnTimerMs % 1000 == 0){
            level++;
        }
        if(this.spawnTimerMs == 37000){
            this.bgm = this.sound.add('newBgm');
            this.bgm.loop = true;
            this.bgm.play();
        }
        // changes spawn rate based on seconds passed (Hard)
        if(this.spawnTimerMs <= 12000 && this.spawnTimerMs % 1000 == 0){
            this.addObstacle(Phaser.Math.Between(1,3));
        } 
        if(this.spawnTimerMs > 12000 && this.spawnTimerMs <= 24000 &&this.spawnTimerMs % 700 == 0){
            this.addObstacle(Phaser.Math.Between(1,3));
        }
        if(this.spawnTimerMs > 24000 && this.spawnTimerMs <= 36000 &&this.spawnTimerMs % 500 == 0){
            this.addObstacle(Phaser.Math.Between(1,3));
        }
        if(this.spawnTimerMs > 36000 && this.spawnTimerMs % 250 == 0){
            this.addObstacle(Phaser.Math.Between(1,3));
        }

        // every 1.5 second pass, increase game speed by 0.1 (Hard)
        if(this.spawnTimerMs % 1500 == 0 && game.settings.startSpeed < 3.5){
            game.settings.startSpeed += 0.1
        }
    }

    minuteBump(){
        minute++;
    }

    collisionHandler(player, obstacle){
        obstacle.body.enable = false;
        player.loseLife();
    }
}