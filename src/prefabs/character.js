// Character prefab
class Character extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
    }

    update(){
        if (keyLEFT.isDown && this.x >= 47) {
            this.x -= 1;
    } else if (keyRIGHT.isDown && this.x <= 598) {
            this.x += 1;
    }
    }
}