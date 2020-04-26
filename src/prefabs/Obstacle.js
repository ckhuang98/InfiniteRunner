// // Obstacles prefab
class Obstacle extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
    }

    update(){
        this.y += game.settings.startSpeed;
        if (this.y >= HEIGHT) {
            this.reset();
        }
    }

    reset() {
        this.y = 0;
    }
}