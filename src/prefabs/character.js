// Character prefab
// Character Fix
class Character extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
    }

    update(){
        if (keyLEFT.isDown && this.x >= 170) {
            this.x -= 2.5;
        } else if (keyRIGHT.isDown && this.x <= 410) {
            this.x += 2.5;
        }
    }
}