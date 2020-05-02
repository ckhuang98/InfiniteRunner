class GameOver extends Phaser.Scene {
    constructor() {
        super("gameOverScene");
    }

    preload(){
        this.load.image('gameOver', './assets/game_over.png');
        this.load.audio('growl', './assets/Monster Growl-SoundBible.com-2140541932.mp3');
    }

    create(){
        this.background = this.add.tileSprite(0, 0, WIDTH, HEIGHT, 'gameOver').setOrigin(0,0);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.gameOverSound = this.sound.add('growl'); // sound for when game is over.
        this.gameOverSound.play();
        
        if(highScore == 0)
        {
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
        }else if(highScore < level){
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
            this.scene.start("playScene");
        }
    }
}