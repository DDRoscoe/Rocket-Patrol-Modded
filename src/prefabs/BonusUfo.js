// BonusUfo prefab
class BonusUfo extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);   // add to existing scene
        this.points = pointValue;   // store pointValue
        this.moveSpeed = game.settings.spaceshipSpeed;        // pixels per frame
    }

    update() {
        // move ufo left
        this.x -= this.moveSpeed + 1.5;      // +5 for increased speed
        // wrap around from left edge to right edge
        if (this.x <= 0 - this.width) {
            this.x = game.config.width;
        }
    }

    // position reset
    reset() {
        this.x = game.config.width;
    }
}