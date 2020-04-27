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
        let randomX = Phaser.Math.Between(188, 378);
        this.x = randomX;
        this.y = -50;

/*
        let randomX = Phaser.Math.Between(1, 4);
        if(randomX == 1){
            this.x = 193;
            this.y = 0;
        } else if (randomX == 2){
            this.x = 248;
            this.y = 0;
        } else if (randomX == 3){
            this.x = 308;
            this.y = 0;
        } else{
            this.x = 368;
            this.y = 0;
        }
        */
    }

    
}