class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }
    preload(){
        this.load.image('menu', './assets/menu.png');
        this.load.audio('click', './assets/Click-SoundBible.com-1387633738.mp3');
    }

    create(){
        this.add.tileSprite(0, 0, 600, 600, 'menu').setOrigin(0, 0);
        
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update(){
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.scene.start("playScene");    
        }
    }
}