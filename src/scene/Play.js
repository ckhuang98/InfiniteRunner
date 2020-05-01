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
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        // place background
        this.background = this.add.tileSprite(0, 0, WIDTH, HEIGHT, 'background').setOrigin(0,0).setDepth(-1);
        this.bgm = this.sound.add('bgm');
        this.bgm.loop = true;
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

        //seconds in game
        level = 0;

        //minutes in game
        minute = 0;

        currentMinute = this.add.text(495, 100, `00: `, { fontFamily: 'Informal Roman', fontSize: '60px', color: '#8a0303' }).setOrigin(0.5);
        currentSecond = this.add.text(560, 100, `00 `, { fontFamily: 'Informal Roman', fontSize: '60px', color: '#8a0303' }).setOrigin(0.5);

        //delays time until a second has passed then calls levelBump
        this.difficultyTimer = this.time.addEvent({
            delay: 1000,
            callback: this.levelBump,
            callbackScope: this,
            loop: true,
        });

        //delays time until a minute has passed then calls minuteBump
        this.difficultyTimer = this.time.addEvent({
            delay: 60000,
            callback: this.minuteBump,
            callbackScope: this,
            loop: true,
        });   

        this.heart = this.add.image(20, 80, 'heart').setOrigin(0.0);
        this.heartsLeft = game.settings.hearts;
        this.currentHearts = this.add.text(120, 100, `x${this.heartsLeft}  `, { fontFamily: 'Informal Roman', fontSize: '56px', color: '#8a0303' }).setOrigin(0.5);
        
    }


    update(){
        this.background.tilePositionY -= game.settings.startSpeed;
        if(level % 60 < 9){
            currentSecond.setText(`0${level % 60} `)
        }else{
            currentSecond.setText(`${level % 60} `)
        }

        if(minute < 9){
            currentMinute.setText(`0${minute}: `)
        }else{
            currentMinute.setText(`${minute}: `)
        }
        if(!this.gameOver){
            this.flashlight.update();
            this.character.update();
        }
        if(this.gameOver){
            game.settings.startSpeed = 1;
            this.scene.start("gameOverScene");
        }

        this.checkCollision(this.character, obstacleArray);
    }


    addObstacle(num){
        if(num == 1){
            let pothole = new Obstacle(this, Phaser.Math.Between(188, 378), -50, 'pothole').setOrigin(0,0).setDepth(-1);
            this.obstacleGroup.add(pothole);
            obstacleArray = this.obstacleGroup.getChildren();
        } else if (num == 2){
            let car = new Obstacle(this, Phaser.Math.Between(188, 378), -50, 'car').setOrigin(0,0).setDepth(-1);
            this.obstacleGroup.add(car);
            obstacleArray = this.obstacleGroup.getChildren();
        } else if (num == 3){
            let car2 = new Obstacle(this, Phaser.Math.Between(188, 378), -50, 'car2').setOrigin(0,0).setDepth(-1);
            this.obstacleGroup.add(car);
            obstacleArray = this.obstacleGroup.getChildren();
        }
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

    minuteBump(){
        minute++;
    }
    // Makes character lose life, and set gameover to true
    loseLife(character, obstacle){
        this.sfx = this.sound.add('thud');
        this.sfx.play();
        this.heartsLeft--;
        this.currentHearts.setText(`x${this.heartsLeft}  `);
        obstacle.reset();
        if(this.heartsLeft == 0){
            this.gameOver = true;
        }
        character.play('flash');

        this.flashTime = this.time.delayedCall(2500, () => {
            this.character.play('walk');
        }, null, this);

        console.log(this.heartsLeft);
    }


}