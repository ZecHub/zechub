export default class Zebra {
    constructor(scene, x, y, animationSpeed = 30, name) {
        this.scene = scene;  // Phaser scene reference
        this.x = x;          // Starting x position
        this.y = y;          // Starting y position
        this.animationSpeed = animationSpeed;  // Speed of animation
        this.zebraName = name;

        this.scl = 0.27;

        // Create the sprite for the zebra
        this.zebraSprite = this.scene.add.sprite(this.x, this.y, 'zebraFrame1');
        this.zebraSprite.setOrigin(0.5, 0.5);

        // Load the zebra animation frames (assuming you have a sprite sheet for the zebra)
        const frameNames = [];
        for(let i = 0; i < 24; i ++) {
            frameNames.push({key: `zebraFrame${i+1}`});
        } 

        this.scene.anims.create({
            key: 'run',
            frames: frameNames,
            frameRate: this.animationSpeed,            
            repeat: -1 // Repeat the animation infinitely
        });

        // Resize zebra to fit on track        
        this.zebraSprite.setDisplaySize(this.zebraSprite.width*this.scl, this.zebraSprite.height*this.scl)

    }

    // Method to update the zebra's position smoothly
    move(offsetX) {        
        if(offsetX < 0) this.setAnimationSpeed(10);
        else this.setAnimationSpeed(15);
        this.scene.tweens.add({
            targets: this.zebraSprite,
            x: this.zebraSprite.x + offsetX, // Move left or right based on the offset
            duration: offsetX < 64 ? 1000 : 2000, // 1 second for smooth animation (can be adjusted)
            ease: 'Power1'
        });
    }

    // Method to set zebra X position on screen
    setPos(x) {
        this.zebraSprite.x = x;
        this.zebraSprite.setPosition(x, this.zebraSprite.y)
    }

    // Method to set zebra X position on screen
    getFinishPos() {        
        return this.zebraSprite.x + (this.zebraSprite.width * this.scl) / 2;
        
    }

    // Adjust the animation speed dynamically
    setAnimationSpeed(newSpeed) {
        this.animationSpeed = newSpeed;
        this.zebraSprite.anims.timeScale = newSpeed / 10; // Adjust time scale based on speed
    }

    startAnimation() {
        this.zebraSprite.play('run');
    }
    
    stopAnimation() {
        this.zebraSprite.anims.stop();
    }
}
