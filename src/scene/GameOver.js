class GameOver extends Phaser.Scene {
    constructor() {
        super("gameOverScene");
    }

    preload(){
        this.load.image('gameOver', './assets/game_over.png');  
    }

    create(){
        this.background = this.add.tileSprite(0, 0, WIDTH, HEIGHT, 'gameOver').setOrigin(0,0);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        if(localStorage.getItem('hiscore') != null) {
            let storedScore = parseInt(localStorage.getItem('hiscore'));
            //console.log(`storedScore: ${storedScore}`);
            // see if current score is higher than stored score
            if(level > storedScore) {
                //console.log(`New high score: ${level}`);
                localStorage.setItem('hiscore', level.toString());
                highScore = level;
                newHighScore = true;
            } else {
                //console.log('No new high score :/');
                highScore = parseInt(localStorage.getItem('hiscore'));
                newHighScore = false;
            }
        } else {
            //console.log('No high score stored. Creating new.');
            highScore = level;
            localStorage.setItem('hiscore', highScore.toString());
            newHighScore = true;
        }
        this.add.text(450, 310, `${level}s`, { fontFamily: 'Informal Roman', fontSize: '48px', color: '#8a0303' }).setOrigin(0.5);
    }
    update(){
        if (Phaser.Input.Keyboard.JustDown(keyUP)) {
            this.scene.start("menuScene");
        }else if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.scene.start("playScene");
        }
    }
}