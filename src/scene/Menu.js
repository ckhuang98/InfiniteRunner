class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }
    preload(){
        this.load.image('menu', './assets/menu.png');
        this.load.audio('click', './assets/Click-SoundBible.com-1387633738.mp3');
        this.load.audio('menuTheme', './assets/2018-02-24_-_Monster_In_The_Field_-_David_Fesliyan.mp3');
    }

    create(){
        this.add.tileSprite(0, 0, 600, 600, 'menu').setOrigin(0, 0);
        this.add.text(370, 500, `${highScore}s`, { fontFamily: 'Informal Roman', fontSize: '40px', color: '#FFFFFF' }).setOrigin(0.5);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update(){
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.scene.start("playScene");
        }
    }
}