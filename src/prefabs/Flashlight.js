class Flashlight extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this); // add to existing scene, displayList, updateList
        // store pointValue
        this.points = pointValue;
    }

    update() {
        if (keyLEFT.isDown && this.x >= 0) {
            this.x -= 2.5;
        } else if (keyRIGHT.isDown && this.x <= 600) {
            this.x += 2.5;
        }
        if (this.x <= 0-this.width) {
            this.resetRight();
        }
    }

    resetRight() {
        this.x = game.config.width;
    }
}