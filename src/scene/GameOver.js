class GameOver extends Phaser.Scene {
    constructor() {
        super("gameOverScene");
    }

    preload(){
        this.load.image('gameOver', './assets/game_over.png');
        this.load.audio('growl', './assets/Monster Growl-SoundBible.com-2140541932.mp3');
        this.load.spritesheet('monsterEnd', './assets/monsterSprite.png', {frameWidth: 300, frameHeight: 150, startFrame: 0, endFrame: 1});
        this.load.atlas('monsterSprite', './assets/monsterSprite.png', './assets/monsterSprite.json');
    }

    create(){
        this.background = this.add.tileSprite(0, 0, WIDTH, HEIGHT, 'gameOver').setOrigin(0,0);
        this.anims.create({
            key: 'end',
            frames: this.anims.generateFrameNumbers('monsterEnd', { start: 0, end: 1, first: 0}),
            frameRate: 5,
            repeat: -1
        });
        let monsterEnd = this.add.sprite(165, -10, 'monsterEnd').setOrigin(0, 0);
        monsterEnd.anims.play('end');

        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.gameOverSound = this.sound.add('growl'); // sound for when game is over.
        this.gameOverSound.play();
        
        if(highScore < level){
            highScore = level;

            if(level < 10){//if somehow under 15 sec just in case
                highScoreStr = `00:0${level}`;
            }
            else if(minute < 10){
                highScoreStr = `0${minute}:${level % 60}`;
            }else{
                highScoreStr = `${minute}:${level % 60}`;
            }

            this.add.text(420, 260, `${highScoreStr} `, { fontFamily: 'Informal Roman', fontSize: '46px', color: '#8a0303' }).setOrigin(0.5);
            this.add.text(485, 355, `${highScoreStr} `, { fontFamily: 'Informal Roman', fontSize: '46px', color: '#8a0303' }).setOrigin(0.5);
        }else{
            let localScore = '';

            if(level < 10){//if somehow under 15 sec just in case
                localScore = `00:0${level}`;
            }
            else if(minute < 10){
                localScore = `0${minute}:${level % 60}`;
            }else{
                localScore = `${minute}:${level % 60}`;
            }
            
            this.add.text(420, 260, `${localScore} `, { fontFamily: 'Informal Roman', fontSize: '46px', color: '#8a0303' }).setOrigin(0.5);
            this.add.text(485, 355, `${highScoreStr} `, { fontFamily: 'Informal Roman', fontSize: '46px', color: '#8a0303' }).setOrigin(0.5);
        }
        
    }
    update(){
        if (Phaser.Input.Keyboard.JustDown(keyUP)) {
            this.scene.start("menuScene");
        }else if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            if(modeEasy == true){
                this.scene.start("playScene");
            } else{
                this.scene.start("playHardScene");
            }
        }
    }
}