
class Monster extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, ) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setCollideWorldBounds(true);
        

        this.scene.anims.create({
            key: 'crawl',
            frames: this.scene.anims.generateFrameNumbers('monsterWalk', { start: 0, end: 1, first: 0}),
            frameRate: 5,
            repeat: -1
        });

        this.anims.play('crawl');
    }

    update(){
        if (keyLEFT.isDown && this.x >= 105) {
            this.x -= 2.5;
        } else if (keyRIGHT.isDown && this.x <= 345) {
            this.x += 2.5;
        }
    }
}
