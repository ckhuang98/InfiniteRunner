// Character prefab
class Character extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
    }

    update(){
        if (keyLEFT.isDown && this.x >= 175) {
            this.x -= 2.5;
    } else if (keyRIGHT.isDown && this.x <= 425) {
            this.x += 2.5;
    }
    }
}