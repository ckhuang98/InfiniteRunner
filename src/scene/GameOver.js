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
    }
    update(){
        if (Phaser.Input.Keyboard.JustDown(keyUP)) {
            this.scene.start("menuScene");
        }else if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.scene.start("playScene");
        }
    }
}