class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }
    preload(){
        this.load.image('menu', './assets/menu.png');
        this.load.audio('click', './assets/press.mp3');
        this.load.audio('menuTheme', './assets/menuSound.mp3');
    }

    create(){
        this.add.tileSprite(0, 0, 600, 600, 'menu').setOrigin(0, 0);
        modeEasy = true;//reset default mode
        game.settings = {//reset default mode
            startSpeed: 1,
            hearts: 5
        }
        modeSet = this.add.text(490, 458, "Easy", { fontFamily: 'Times New Roman', fontSize: '30px', color: '#FFFFFF'}).setOrigin(0.5);
        this.add.text(370, 495, `${highScoreStr} `, { fontFamily: 'Times New Roman', fontSize: '30px', color: '#FFFFFF'}).setOrigin(0.5);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.menuTheme = this.sound.add('menuTheme');
        this.menuTheme.loop = true;
        this.menuTheme.play();
        this.click = this.sound.add('click');
    }

    update(){
        if (Phaser.Input.Keyboard.JustDown(keyUP)) {
            this.click.play();
            if(modeEasy){
                modeSet.setText("Hard")
                modeEasy = false;
                game.settings = {
                    startSpeed: 1,
                    hearts: 3
                }
            }else{
                modeSet.setText("Easy")
                modeEasy = true;
                game.settings = {
                    startSpeed: 1,
                    hearts: 5
                }
            }   
        }
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.click.play();
            if(modeEasy == true){
                this.scene.start("playScene");
                this.menuTheme.stop();
            } else{
                this.scene.start("playHardScene");
                this.menuTheme.stop();
            }
        }
    }
}