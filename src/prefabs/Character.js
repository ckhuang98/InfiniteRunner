// Character prefab
// Character Fix
class Character extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, ) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setCollideWorldBounds(true);
        

        this.scene.anims.create({
            key: 'walk',
            frames: this.scene.anims.generateFrameNumbers('player', { start: 0, end: 1, first: 0}),
            frameRate: 5,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'flash',
            frames: this.scene.anims.generateFrameNumbers('player', {start: 0, end: 4, first: 0}),
            frameRate: 5,
            repeat: -1
        });

        this.anims.play('walk');

        this.heartsLeft = game.settings.hearts;
    }

    update(){
        if (keyLEFT.isDown && this.x >= 170) {
            this.x -= 2.5;
        } else if (keyRIGHT.isDown && this.x <= 410) {
            this.x += 2.5;
        }
    }


    loseLife(){
        this.sfx = this.scene.sound.add('thud');
        this.sfx.play();
        this.heartsLeft--;
        this.scene.currentHearts.setText(`x${this.heartsLeft}  `);
        if(this.heartsLeft == 0){
            gameOver = true;
        }
        this.play('flash');

        this.flashTime = this.scene.time.delayedCall(2500, () => {
            this.scene.character.play('walk');
        }, null, this);

        console.log(this.heartsLeft);
    }
}
